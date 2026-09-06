"""Shared generation-reference resolution for the existing batch and prompt hook.

This validates selected input identity, not art quality or public pixel reuse.
"""
import hashlib
import json
import re
from pathlib import Path

MANIFEST = 'operations/reference/episode-approved/manifest.json'
REGISTRY = 'operations/assets/active-asset-registry.json'
MARKER = 'VISUAL_REFERENCE_BINDING: '
ALLOWED = {
    'master_people_rendering_style_and_heroine_identity': {'LOCKED'},
    'character_identity': {'IDENTITY_REFERENCE_ONLY', 'APPROVED_IDENTITY_REFERENCE'},
    'category_grammar': {'GOVERNING_README'},
    'wardrobe_grammar': {'GOVERNING_README'},
}


def safe_file(root, relative):
    if not isinstance(relative, str) or not relative or '\\' in relative:
        raise ValueError('reference path must be a non-empty repository-relative path')
    p = Path(relative)
    if p.is_absolute() or '..' in p.parts:
        raise ValueError('unsafe reference path: ' + relative)
    base = Path(root).resolve()
    target = (base / p).resolve()
    if base not in target.parents or not target.is_file():
        raise ValueError('missing or escaping reference: ' + relative)
    return target


def sha(target):
    return hashlib.sha256(target.read_bytes()).hexdigest()


def resolve(root, binding):
    if not isinstance(binding, dict) or binding.get('purpose') != 'generation':
        raise ValueError('binding must explicitly request generation references; it cannot authorize reuse')
    if not isinstance(binding.get('destination'), str) or not re.fullmatch(r'episode-\d{2}-art-batch', binding['destination']):
        raise ValueError('this resolver supports episode-NN-art-batch only; other destinations need their scoped authority')
    size = binding.get('dimensions')
    if not isinstance(size, list) or len(size) != 2 or any(type(v) is not int or v <= 0 for v in size):
        raise ValueError('explicit positive output width and height are required')
    ids = binding.get('reference_ids')
    if not isinstance(ids, list) or not ids or any(not isinstance(v, str) or not v for v in ids) or len(set(ids)) != len(ids):
        raise ValueError('select explicit unique current reference IDs')
    manifest_file = safe_file(root, MANIFEST)
    if binding.get('manifest_sha256') != sha(manifest_file):
        raise ValueError('reference manifest changed; resolve current references before writing prompt')
    data = json.loads(manifest_file.read_text())
    if data.get('schema') != 'laidies.episode-approved-reference-manifest.v1' or data.get('status') != 'LOCKED_POINTERS_ONLY_NO_COPIED_ASSETS':
        raise ValueError('unsupported or unlocked reference manifest')
    refs = data.get('references')
    if not isinstance(refs, list):
        raise ValueError('manifest references must be a list')
    lookup = {}
    for ref in refs:
        if not isinstance(ref, dict) or not isinstance(ref.get('id'), str) or ref['id'] in lookup:
            raise ValueError('invalid or duplicate reference ID')
        lookup[ref['id']] = ref
    unavailable = data.get('unavailable_required_references', [])
    rejected = data.get('rejected_references', [])
    if not isinstance(unavailable, list) or not isinstance(rejected, list):
        raise ValueError('manifest unavailable/rejected entries must be lists')
    blocked_ids, blocked_paths, blocked_hashes = set(), set(), set()
    for ref in unavailable + rejected:
        if not isinstance(ref, dict):
            raise ValueError('invalid unavailable/rejected reference')
        # A former ID may be reused for a later approved identity. Revoke its
        # old exact bytes/path; only unavailable entries block a stable ID.
        if ref in unavailable and ref.get('id'): blocked_ids.add(ref['id'])
        if ref in rejected and not ref.get('path') and not ref.get('sha256') and ref.get('id'):
            blocked_ids.add(ref['id'])
    for ref in rejected:
        if ref.get('path'): blocked_paths.add(ref['path'])
        if ref.get('sha256'): blocked_hashes.add(ref['sha256'])
    registry = json.loads(safe_file(root, REGISTRY).read_text())
    if registry.get('schema') != 'laidies.active-assets.v1' or registry.get('default_policy') != 'DENY':
        raise ValueError('current asset registry is required for revocation checks')
    entries = registry.get('entries')
    retired = registry.get('retired_paths', [])
    if not isinstance(entries, list) or any(not isinstance(e, dict) for e in entries):
        raise ValueError('invalid asset registry entries')
    if not isinstance(retired, list) or any(not isinstance(p, str) for p in retired):
        raise ValueError('invalid retired paths')
    for ref in entries:
        if ref.get('status') != 'ACTIVE':
            if ref.get('path'): blocked_paths.add(ref['path'])
            if ref.get('sha256'): blocked_hashes.add(ref['sha256'])
    blocked_paths.update(registry.get('retired_paths', []))
    selected = []
    for ref_id in ids:
        if ref_id in blocked_ids or ref_id not in lookup:
            raise ValueError('unavailable, rejected or unknown reference: ' + ref_id)
        ref = lookup[ref_id]
        if ref.get('approval') not in ALLOWED.get(ref.get('role'), set()):
            raise ValueError('reference is not eligible for this generation-input role: ' + ref_id)
        if not isinstance(ref.get('scope'), str) or not ref['scope'].strip():
            raise ValueError('reference has no explicit usage scope: ' + ref_id)
        destinations = ref.get('allowed_destinations')
        if destinations is not None and (not isinstance(destinations, list) or 'episode' not in destinations):
            raise ValueError('reference is not approved for episode use: ' + ref_id)
        expected = ref.get('sha256')
        if not isinstance(expected, str) or not re.fullmatch('[0-9a-f]{64}', expected):
            raise ValueError('invalid reference checksum: ' + ref_id)
        if ref.get('path') in blocked_paths or expected in blocked_hashes:
            raise ValueError('revoked reference: ' + ref_id)
        target = safe_file(root, ref.get('path'))
        if sha(target) != expected:
            raise ValueError('reference bytes changed: ' + ref_id)
        if ref.get('authority_sha256') is not None:
            authority = ref.get('authority')
            if not isinstance(authority, str) or sha(safe_file(root, authority.split('#')[0])) != ref['authority_sha256']:
                raise ValueError('reference approval source changed: ' + ref_id)
        selected.append(ref)
    return selected


def extract(text):
    matches = [line[len(MARKER):] for line in text.splitlines() if line.startswith(MARKER)]
    if len(matches) != 1:
        raise ValueError('one current VISUAL_REFERENCE_BINDING is required')
    return json.loads(matches[0])


def make(root, destination, dimensions, ids):
    binding = dict(purpose='generation', destination=destination, dimensions=dimensions,
                   reference_ids=ids, manifest_sha256=sha(safe_file(root, MANIFEST)))
    return binding, resolve(root, binding)
