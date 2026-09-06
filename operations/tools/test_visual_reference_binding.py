#!/usr/bin/env python3
"""Calibrate input-selection failures; no claim of artwork quality or native loading."""
import copy
import importlib.util
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
from visual_reference_binding import MANIFEST, REGISTRY, MARKER, make, resolve, sha

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('batch', HERE / 'build-art-batch.py')
batch = importlib.util.module_from_spec(spec)
spec.loader.exec_module(batch)


class ReferenceTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.write('assets/master.png', 'master')
        self.write('assets/identity.png', 'identity')
        self.data = dict(schema='laidies.episode-approved-reference-manifest.v1', status='LOCKED_POINTERS_ONLY_NO_COPIED_ASSETS', references=[
            dict(id='MASTER', role='master_people_rendering_style_and_heroine_identity', approval='LOCKED', path='assets/master.png', sha256=sha(self.root/'assets/master.png'), scope='Episode heroine rendering', allowed_destinations=['episode']),
            dict(id='PERSON', role='character_identity', approval='IDENTITY_REFERENCE_ONLY', path='assets/identity.png', sha256=sha(self.root/'assets/identity.png'), scope='Episode person identity', allowed_destinations=['episode'])], rejected_references=[], unavailable_required_references=[])
        self.registry = dict(schema='laidies.active-assets.v1', default_policy='DENY', entries=[], retired_paths=[])
        self.save()
        self.write('content/episodes/episode-04.canon.md', '## cast[]\n| ada | Ada Lovelace | ada-lovelace |\n## heroine_outfit\nCurrent outfit\n')
        self.write('operations/art-requirements.md', 'Current scoped requirements')
        self.write('cues.json', json.dumps([dict(t=0, label='before', src='retired-locked.png')]))
        self.write('timing.json', '{}')
        self.beat = dict(t=1, dur=2, says=[['Narrator', 'Mechanism']], subjects=[], scene='empty room', wardrobe='no people', continuity_reference_ids=['MASTER'], continuity_job='approved composition only')
        self.write('needed.json', json.dumps([self.beat]))

    def write(self, name, content):
        p=self.root/name; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(content); return p

    def save(self):
        self.write(MANIFEST, json.dumps(self.data)); self.write(REGISTRY, json.dumps(self.registry))

    def binding(self, ids=None):
        return make(self.root, 'episode-04-art-batch', [1000, 1200], ids or ['MASTER'])[0]

    def build(self):
        self.write('needed.json', json.dumps([self.beat]))
        return batch.build(self.root, self.root/'cues.json', self.root/'timing.json', self.root/'needed.json', '04', [1000,1200], ['MASTER','PERSON'])

    def test_generation_does_not_require_public_active(self):
        self.assertEqual(len(resolve(self.root, self.binding(['MASTER','PERSON']))),2)

    def test_revocation_wins_over_active(self):
        e=self.data['references'][0]
        for entries, retired in [([dict(e,status='ACTIVE'),dict(e,status='REJECTED')],[]),([], [e['path']]),([dict(path='other.png',sha256=e['sha256'],status='REJECTED')],[])]:
            with self.subTest(entries=entries):
                self.registry.update(entries=entries,retired_paths=retired);self.save()
                with self.assertRaisesRegex(ValueError,'revoked'): self.binding()

    def test_manifest_rejected_bytes_not_permanent_id(self):
        self.data['rejected_references']=[dict(former_id='MASTER',path='old.png',sha256='a'*64)];self.save();self.binding()
        self.data['rejected_references'][0]['sha256']=self.data['references'][0]['sha256'];self.save()
        with self.assertRaisesRegex(ValueError,'revoked'):self.binding()

    def test_unavailable_unknown_duplicate(self):
        for ids in [['unknown'],['MASTER','MASTER']]:
            with self.assertRaises(ValueError):self.binding(ids)
        self.data['unavailable_required_references']=[dict(id='MASTER')];self.save()
        with self.assertRaisesRegex(ValueError,'unavailable'):self.binding()

    def test_stale_manifest_and_bytes(self):
        b=self.binding();self.data['note']='changed';self.save()
        with self.assertRaisesRegex(ValueError,'manifest changed'):resolve(self.root,b)
        self.write('assets/master.png','drift')
        with self.assertRaisesRegex(ValueError,'bytes changed'):self.binding()

    def test_role_destination_and_size(self):
        for field,value in [('role','audio'),('approval','REJECTED'),('allowed_destinations',['library'])]:
            original=copy.deepcopy(self.data);self.data['references'][0][field]=value;self.save()
            with self.assertRaises(ValueError):self.binding()
            self.data=original;self.save()
        b=self.binding()
        for size in [[0,1],[True,1],[1.1,2]]:
            with self.assertRaises(ValueError):resolve(self.root,dict(b,dimensions=size))
        with self.assertRaises(ValueError):resolve(self.root,dict(b,destination='library'))

    def test_changed_approval_source_and_symlink_escape(self):
        p=self.write('operations/approval.md','current decision')
        self.data['references'][0].update(authority='operations/approval.md#section',authority_sha256=sha(p));self.save();self.binding()
        p.write_text('changed decision')
        with self.assertRaisesRegex(ValueError,'approval source changed'):self.binding()
        self.data['references'][0].pop('authority_sha256')
        (self.root/'assets/master.png').unlink()
        (self.root/'assets/master.png').symlink_to(HERE/'visual_reference_binding.py')
        self.save()
        with self.assertRaisesRegex(ValueError,'escaping'):self.binding()

    def test_escape_and_malformed_registry(self):
        for bad in ['../outside.png','/outside.png','assets\\outside.png']:
            self.data['references'][0]['path']=bad;self.save()
            with self.assertRaises(ValueError):self.binding()
        self.registry['entries']=[None];self.save()
        with self.assertRaisesRegex(ValueError,'invalid asset'):self.binding()

    def test_batch_no_filename_approval(self):
        result=self.build();self.assertNotIn('retired-locked.png',result);self.assertIn('1000 × 1200',result)

    def test_batch_missing_subject_and_continuity_hold(self):
        for field in ['subjects','continuity_reference_ids','scene','wardrobe']:
            original=copy.deepcopy(self.beat);del self.beat[field]
            with self.assertRaises(ValueError):self.build()
            self.beat=original
        self.beat['subjects']=[dict(cast_key='ada',identity_reference_id='PERSON')]
        with self.assertRaisesRegex(ValueError,'likeness'):self.build()
        self.beat['subjects'][0]['identity_reference_id']='MASTER'
        with self.assertRaisesRegex(ValueError,'own identity'):self.build()
        self.beat['subjects'][0]['identity_reference_id']='PERSON'
        p=self.write('operations/reference/real-people/ada-lovelace/photo.png','photo')
        self.beat['subjects'][0]['likeness_source']=dict(path=str(p.relative_to(self.root)),sha256=sha(p))
        self.assertIn('ada-lovelace/photo.png',self.build())

    def test_batch_master_timing_and_covered_hold(self):
        self.beat['reference_ids']=['PERSON']
        with self.assertRaisesRegex(ValueError,'master'):self.build()
        del self.beat['reference_ids'];self.beat['dur']=float('nan')
        with self.assertRaises(ValueError):self.build()
        self.beat['dur']=2;self.write('operations/ep04-cut-decisions.md','| 0:01.00 | existing.png |\n')
        with self.assertRaisesRegex(ValueError,'already covered'):self.build()

    def hook(self, inp, tool='Write'):
        tools=self.root/'operations/tools';tools.mkdir(parents=True,exist_ok=True)
        for name in ['visual_reference_binding.py','build-art-batch.py']: shutil.copy2(HERE/name,tools/name)
        hook=self.root/'.claude/hooks/enforce-art-prompt.py';hook.parent.mkdir(parents=True,exist_ok=True)
        shutil.copy2(HERE.parents[1]/'.claude/hooks/enforce-art-prompt.py',hook)
        result=subprocess.run([sys.executable,str(hook)],input=json.dumps(dict(tool_name=tool,tool_input=inp)),text=True,capture_output=True)
        self.assertEqual(result.returncode,0,result.stderr)
        return result.stdout

    def test_hook_write_edit_stale_underscore(self):
        path=self.root/'codex-prompts/_ep04-art.md'
        good=self.build()
        self.assertEqual(self.hook(dict(file_path=str(path),content=good)),'')
        self.assertIn('deny',self.hook(dict(file_path=str(path),content='Draw the scene.')))
        self.write(str(path.relative_to(self.root)),good)
        self.assertIn('deny',self.hook(dict(file_path=str(path),old_string='empty room',new_string='Ada scene'),'Edit'))
        self.assertIn('deny',self.hook(dict(file_path=str(path),content=MARKER+json.dumps(self.binding())+'\nDraw Ada.')))
        self.assertEqual(self.hook(dict(file_path=str(path),old_string='empty room',new_string='empty room'),'Edit'),'')
        self.data['note']='changed';self.save()
        self.assertIn('deny',self.hook(dict(file_path=str(path),old_string='empty room',new_string='room'),'Edit'))

    def test_cli_missing_binding_preserves_existing_output(self):
        tools=self.root/'operations/tools';tools.mkdir(parents=True,exist_ok=True)
        for name in ['build-art-batch.py','visual_reference_binding.py']:shutil.copy2(HERE/name,tools/name)
        out=self.write('out.md','preserve')
        result=subprocess.run([sys.executable,str(tools/'build-art-batch.py'),str(self.root/'cues.json'),str(self.root/'timing.json'),str(self.root/'needed.json'),'04',str(out)],capture_output=True,text=True)
        self.assertNotEqual(result.returncode,0);self.assertEqual(out.read_text(),'preserve')

if __name__=='__main__':unittest.main(verbosity=2)
