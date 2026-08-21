#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = path.resolve(import.meta.dirname, '..');
const defaultConfigPath = path.join(repoRoot, 'operations/video-qa/episode-04-v22-smooth-continuity-review/config.json');
const configArgIndex = process.argv.indexOf('--config');
const configPath = configArgIndex >= 0 ? path.resolve(process.argv[configArgIndex + 1]) : defaultConfigPath;
const timelineArgIndex = process.argv.indexOf('--timeline');
const manifestPath = path.join(repoRoot, 'operations/video-qa/episode-04-v22-smooth-continuity-review/capcut-overlay-manifest.json');
const flatMediaDir = process.env.EP04_CAPCUT_FLAT_MEDIA_DIR
  ? path.resolve(process.env.EP04_CAPCUT_FLAT_MEDIA_DIR)
  : null;

const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const sha256 = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const uuid = () => crypto.randomUUID().toUpperCase();
const uniqueHex = () => crypto.randomBytes(16).toString('hex');
const deepClone = value => structuredClone(value);

function fail(message) {
  throw new Error(`EP04_V22_FAIL_CLOSED: ${message}`);
}

function resolveAsset(relativeOrAbsolute) {
  const authoritativePath = path.isAbsolute(relativeOrAbsolute)
    ? relativeOrAbsolute
    : path.join(repoRoot, relativeOrAbsolute);
  if (!flatMediaDir) return authoritativePath;
  // A unique import name prevents CapCut from remapping a v18 source to an
  // older project-media entry that happens to share the same basename.
  const digestPrefix = sha256(authoritativePath).slice(0, 12);
  const suffix = `-${digestPrefix}-${path.basename(authoritativePath)}`;
  const matchingNames = fs.readdirSync(flatMediaDir)
    .filter(name => name.endsWith(suffix))
    .sort();
  const flatPath = matchingNames.length
    ? path.join(flatMediaDir, matchingNames.at(-1))
    : path.join(flatMediaDir, `v22${suffix}`);
  if (!fs.existsSync(flatPath)) fail(`missing flat CapCut media link: ${flatPath}`);
  if (sha256(flatPath) !== sha256(authoritativePath)) {
    fail(`flat CapCut media checksum mismatch: ${flatPath}`);
  }
  return flatPath;
}

function findMaterialById(materials, id) {
  for (const [bucket, values] of Object.entries(materials)) {
    if (!Array.isArray(values)) continue;
    const item = values.find(value => value?.id === id);
    if (item) return { bucket, item };
  }
  return null;
}

function cloneExtraMaterials(draft, templateSegment) {
  const ids = [];
  for (const sourceId of templateSegment.extra_material_refs) {
    const found = findMaterialById(draft.materials, sourceId);
    if (!found) fail(`missing extra material ${sourceId}`);
    const clone = deepClone(found.item);
    clone.id = uuid();
    draft.materials[found.bucket].push(clone);
    ids.push(clone.id);
  }
  return ids;
}

function buildMaterial(template, overlay, absolutePath, officialMedia) {
  const material = deepClone(template);
  material.unique_id = uniqueHex();
  return bindMaterialToOfficial(material, overlay, absolutePath, officialMedia);
}

function bindMaterialToOfficial(material, overlay, absolutePath, officialMedia) {
  material.id = officialMedia.id;
  // CapCut resolves timeline materials through local_material_id when a
  // multi-timeline project is reopened.  A random local id makes a perfectly
  // valid source render as Unsupported Media and CapCut then rewrites the
  // timeline back to a stale material.  Bind both identities to the exact
  // native project-media row.
  material.local_material_id = officialMedia.id;
  material.origin_material_id = '';
  material.path = officialMedia.resolvedPath;
  material.media_path = '';
  material.material_name = officialMedia.extra_info || path.basename(absolutePath);
  material.type = overlay.type;
  material.has_audio = false;
  material.duration = overlay.type === 'photo'
    ? 10800000000
    : Math.max(overlay.sourceStartUs + overlay.sourceDurationUs, overlay.sourceDurationUs);
  material.width = 1920;
  material.height = 1080;
  return material;
}

function indexOfficialProjectMedia(meta, projectRoot) {
  const mediaBucket = meta.draft_materials?.find(group => group.type === 0);
  if (!mediaBucket || !Array.isArray(mediaBucket.value)) {
    fail('project media registry bucket missing');
  }
  const bySha256 = new Map();
  for (const entry of mediaBucket.value) {
    if (!entry?.id || !entry.file_Path) continue;
    // CapCut removes synthetic registry rows when the project opens. Only use
    // media that CapCut itself retained in the project's native import folder.
    if (!entry.file_Path.startsWith('./v16-linked-media/')) continue;
    const resolved = path.isAbsolute(entry.file_Path)
      ? entry.file_Path
      : path.resolve(projectRoot, entry.file_Path);
    if (!fs.existsSync(resolved)) continue;
    const digest = sha256(resolved);
    if (!bySha256.has(digest)) bySha256.set(digest, []);
    bySha256.get(digest).push({ ...entry, resolvedPath: resolved });
  }
  for (const candidates of bySha256.values()) {
    candidates.sort((a, b) => {
      const aChecksumNamed = path.basename(a.file_Path).startsWith('v18-') ? 0 : 1;
      const bChecksumNamed = path.basename(b.file_Path).startsWith('v18-') ? 0 : 1;
      // Prefer the row CapCut most recently created through its actual Import
      // UI. Older synthetic/stale rows can have the same checksum and path but
      // are not backed by CapCut's internal media database and render offline.
      return aChecksumNamed - bChecksumNamed
        || Number(b.import_time_ms || 0) - Number(a.import_time_ms || 0)
        || a.file_Path.localeCompare(b.file_Path);
    });
  }
  return bySha256;
}

function alphaFadeIn(durationUs) {
  return [{
    id: uniqueHex(),
    material_id: '',
    property_type: 'KFTypeAlpha',
    keyframe_list: [
      {
        id: uniqueHex(),
        curveType: 'FreeCurveInOut',
        time_offset: 0,
        left_control: { x: 0, y: 0 },
        right_control: { x: Math.floor(durationUs * 0.42), y: 0 },
        values: [0],
        string_value: '',
        graphID: ''
      },
      {
        id: uniqueHex(),
        curveType: 'FreeCurveInOut',
        time_offset: durationUs,
        left_control: { x: -Math.floor(durationUs * 0.42), y: 0 },
        right_control: { x: 0, y: 0 },
        values: [1],
        string_value: '',
        graphID: ''
      }
    ]
  }];
}

function buildSegment(draft, templateSegment, material, overlay, renderIndex) {
  const segment = deepClone(templateSegment);
  segment.id = uuid();
  segment.material_id = material.id;
  segment.source_timerange = {
    start: overlay.sourceStartUs ?? 0,
    duration: overlay.type === 'photo' ? overlay.durationUs : overlay.sourceDurationUs
  };
  segment.target_timerange = { start: overlay.startUs, duration: overlay.durationUs };
  segment.render_timerange = { start: 0, duration: 0 };
  segment.is_loop = Boolean(overlay.loop);
  segment.speed = 1.0;
  segment.volume = 0.0;
  segment.last_nonzero_volume = 1.0;
  segment.render_index = renderIndex;
  segment.track_render_index = renderIndex;
  segment.extra_material_refs = cloneExtraMaterials(draft, templateSegment);
  segment.keyframe_refs = [];
  segment.common_keyframes = overlay.fadeInUs ? alphaFadeIn(overlay.fadeInUs) : [];
  segment.desc = overlay.id;
  return segment;
}

function expandPortraitSequences(config) {
  const overlays = [];
  for (const sequence of config.portraitSequences) {
    const span = sequence.endUs - sequence.startUs;
    const baseDuration = Math.floor(span / config.portraitPaths.length);
    let cursor = sequence.startUs;
    config.portraitPaths.forEach((portraitPath, index) => {
      const durationUs = index === config.portraitPaths.length - 1
        ? sequence.endUs - cursor
        : baseDuration;
      overlays.push({
        id: `${sequence.idPrefix}-${String(index + 1).padStart(2, '0')}`,
        path: portraitPath,
        type: 'photo',
        startUs: cursor,
        durationUs
      });
      cursor += durationUs;
    });
  }
  return overlays;
}

function addPhotoDissolves(overlays) {
  const transitionUs = 650000;
  const hardCutIds = new Set([
    'ai-winter-both-on',
    'ai-winter-one-off',
    'ai-winter-both-off',
    'signoff-hold-until-teaser-clock'
  ]);
  for (let index = 0; index < overlays.length - 1; index += 1) {
    const current = overlays[index];
    const next = overlays[index + 1];
    if (current.type !== 'photo' || hardCutIds.has(current.id) || hardCutIds.has(next.id)) continue;
    if (current.startUs + current.durationUs !== next.startUs) continue;
    if (next.durationUs <= transitionUs) continue;
    current.durationUs += transitionUs;
    next.fadeInUs = transitionUs;
  }
  return overlays;
}

function validateOverlay(overlay, timelineDurationUs) {
  const absolutePath = resolveAsset(overlay.path);
  if (!fs.existsSync(absolutePath)) fail(`missing overlay ${overlay.id}: ${absolutePath}`);
  if (!['photo', 'video'].includes(overlay.type)) fail(`bad type for ${overlay.id}`);
  if (!Number.isInteger(overlay.startUs) || overlay.startUs < 0) fail(`bad start for ${overlay.id}`);
  if (!Number.isInteger(overlay.durationUs) || overlay.durationUs <= 0) fail(`bad duration for ${overlay.id}`);
  if (overlay.startUs + overlay.durationUs > timelineDurationUs) fail(`overlay exceeds timeline: ${overlay.id}`);
  if (overlay.type === 'video') {
    if (!Number.isInteger(overlay.sourceStartUs) || overlay.sourceStartUs < 0) fail(`bad source start for ${overlay.id}`);
    if (!Number.isInteger(overlay.sourceDurationUs) || overlay.sourceDurationUs <= 0) fail(`bad source duration for ${overlay.id}`);
    if (!overlay.loop && overlay.sourceDurationUs !== overlay.durationUs) {
    fail(`non-loop duration mismatch for ${overlay.id}`);
    }
  }
  return absolutePath;
}

function main() {
  const config = readJson(configPath);
  const timelinePath = timelineArgIndex >= 0
    ? path.resolve(process.argv[timelineArgIndex + 1])
    : config.timelinePath;
  const projectRoot = path.resolve(path.dirname(timelinePath), '..', '..');
  const projectMetaPath = path.join(projectRoot, 'draft_meta_info.json');
  if (!fs.existsSync(timelinePath)) fail(`missing CapCut timeline: ${timelinePath}`);
  if (!fs.existsSync(projectMetaPath)) fail(`missing CapCut project metadata: ${projectMetaPath}`);
  if (sha256(config.baseVideo.path) !== config.baseVideo.sha256) fail('base v14 checksum mismatch');

  const draft = readJson(timelinePath);
  const timelinesRoot = path.dirname(path.dirname(timelinePath));
  const timelineAuthorityPaths = [timelinePath];
  for (const entry of fs.readdirSync(timelinesRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^[0-9A-F-]{36}$/i.test(entry.name)) continue;
    const candidate = path.join(timelinesRoot, entry.name, 'draft_info.json');
    if (candidate === timelinePath || !fs.existsSync(candidate)) continue;
    try {
      // This CapCut project contains a duplicate folder carrying the same
      // internal timeline id. CapCut treats that duplicate as a recovery
      // authority and otherwise copies it over Timeline 03 on launch.
      if (readJson(candidate).id === draft.id) timelineAuthorityPaths.push(candidate);
    } catch {
      // Unrelated malformed historical timeline folders are not authorities
      // for the selected candidate.
    }
  }
  const projectMeta = readJson(projectMetaPath);
  const officialMediaBySha256 = indexOfficialProjectMedia(projectMeta, projectRoot);
  if (draft.duration !== config.timelineDurationUs) fail(`timeline duration ${draft.duration} != ${config.timelineDurationUs}`);
  const videoTracks = draft.tracks.filter(track => track.type === 'video');
  if (!videoTracks.length || videoTracks[0].segments.length !== 1) fail('unexpected base track structure');
  const baseSegment = videoTracks[0].segments[0];
  if (baseSegment.target_timerange.start !== 0 || baseSegment.target_timerange.duration !== config.timelineDurationUs) {
    fail('base segment clock changed');
  }
  const baseMaterial = draft.materials.videos.find(item => item.id === baseSegment.material_id);
  if (!baseMaterial) fail('base video material not found');
  baseMaterial.path = config.baseVideo.path;
  baseMaterial.material_name = path.basename(config.baseVideo.path);

  const photoMaterialTemplate = draft.materials.videos.find(item => item.type === 'photo');
  const videoMaterialTemplate = baseMaterial;
  const overlaySegmentTemplate = videoTracks.find(track => track !== videoTracks[0])?.segments?.[0];
  if (!photoMaterialTemplate || !overlaySegmentTemplate) fail('overlay templates missing');

  const overlays = addPhotoDissolves(
    [...config.overlays, ...expandPortraitSequences(config)]
      .map(deepClone)
      .sort((a, b) => a.startUs - b.startUs || a.id.localeCompare(b.id))
  );
  const seenIds = new Set();
  overlays.forEach(overlay => {
    if (seenIds.has(overlay.id)) fail(`duplicate overlay id ${overlay.id}`);
    seenIds.add(overlay.id);
  });

  // Preserve the base track and replace every prior overlay with the checksum-bound v22 set.
  draft.tracks = [videoTracks[0]];
  // Earlier candidate builds left duplicate material objects carrying the
  // same native id. CapCut is free to resolve the first duplicate, which can
  // be the stale relative-path/random-local-id copy even when a later copy is
  // correct. A material id is an identity key: retain only its final object
  // before rebinding the selected v18 sources below.
  const uniqueVideoMaterials = new Map();
  for (const material of draft.materials.videos) {
    uniqueVideoMaterials.set(material.id, material);
  }
  draft.materials.videos = [...uniqueVideoMaterials.values()];
  const manifestOverlays = [];
  const materialsWithOverlays = [];
  const materialByOfficialId = new Map(
    draft.materials.videos.map(material => [material.id, material])
  );
  let renderIndex = 1;
  for (const overlay of overlays) {
    const absolutePath = validateOverlay(overlay, config.timelineDurationUs);
    const digest = sha256(absolutePath);
    const officialCandidates = officialMediaBySha256.get(digest) || [];
    if (!officialCandidates.length) {
      fail(`source is not natively imported in CapCut: ${overlay.id} ${absolutePath}`);
    }
    const officialMedia = officialCandidates[0];
    let material = materialByOfficialId.get(officialMedia.id);
    if (!material) {
      material = buildMaterial(
        overlay.type === 'photo' ? photoMaterialTemplate : videoMaterialTemplate,
        overlay,
        absolutePath,
        officialMedia
      );
      draft.materials.videos.push(material);
      materialByOfficialId.set(material.id, material);
    } else {
      // A previous candidate can leave a timeline material with the correct
      // official id but a stale random local id and relative source path.
      // CapCut then resolves the stale identity and silently substitutes or
      // offlines the shot. Refresh reused materials just as strictly as new
      // materials so the exact checksum-bound source remains authoritative.
      bindMaterialToOfficial(material, overlay, absolutePath, officialMedia);
    }
    materialsWithOverlays.push({ material, overlay });
    const segment = buildSegment(draft, overlaySegmentTemplate, material, overlay, renderIndex);
    draft.tracks.push({
      attribute: 0,
      flag: 0,
      id: uuid(),
      is_default_name: true,
      name: overlay.id,
      segments: [segment],
      type: 'video'
    });
    manifestOverlays.push({
      ...overlay,
      path: absolutePath,
      projectMediaPath: officialMedia.file_Path,
      sha256: sha256(absolutePath),
      materialId: material.id,
      segmentId: segment.id,
      renderIndex
    });
    renderIndex += 1;
  }

  const projectMediaIds = new Set(
    projectMeta.draft_materials.find(group => group.type === 0).value
      .map(item => item?.id)
      .filter(Boolean)
  );
  if (process.argv.includes('--calibrate-registry-failure')) {
    projectMediaIds.delete(materialsWithOverlays[0].material.id);
  }
  const unregistered = materialsWithOverlays
    .map(({ material }) => material)
    .filter(material => !projectMediaIds.has(material.id));
  if (unregistered.length) {
    fail(`project media identity registration incomplete: ${unregistered[0].id} ${unregistered[0].path}`);
  }
  const misbound = materialsWithOverlays.find(({ material, overlay }) => {
    const digest = sha256(validateOverlay(overlay, config.timelineDurationUs));
    const official = (officialMediaBySha256.get(digest) || [])[0];
    return !official
      || material.id !== official.id
      || material.local_material_id !== official.id
      || path.resolve(material.path) !== official.resolvedPath;
  });
  if (misbound) {
    fail(`timeline material binding mismatch: ${misbound.overlay.id} ${misbound.material.id} ${misbound.material.local_material_id} ${misbound.material.path}`);
  }
  const duplicateMaterialIds = draft.materials.videos
    .map(material => material.id)
    .filter((id, index, ids) => ids.indexOf(id) !== index);
  if (duplicateMaterialIds.length) {
    fail(`duplicate timeline material identity: ${duplicateMaterialIds[0]}`);
  }

  const now = new Date().toISOString().replaceAll(':', '-');
  const backupPath = `${timelinePath}.pre-v22-${now}.bak`;
  const projectMetaBackupPath = `${projectMetaPath}.pre-v22-${now}.bak`;
  const timelineAuthorityBackups = [];
  for (const authorityPath of timelineAuthorityPaths) {
    const authorityBackup = `${authorityPath}.pre-v22-${now}.bak`;
    fs.copyFileSync(authorityPath, authorityBackup);
    timelineAuthorityBackups.push(authorityBackup);
  }
  fs.copyFileSync(projectMetaPath, projectMetaBackupPath);
  const serializedDraft = `${JSON.stringify(draft)}\n`;
  for (const authorityPath of timelineAuthorityPaths) {
    const tmpPath = `${authorityPath}.tmp-${process.pid}`;
    fs.writeFileSync(tmpPath, serializedDraft);
    fs.renameSync(tmpPath, authorityPath);
    fs.copyFileSync(authorityPath, `${authorityPath}.bak`);
    const authorityTemplatePath = path.join(path.dirname(authorityPath), 'template-2.tmp');
    if (fs.existsSync(authorityTemplatePath)) fs.copyFileSync(authorityPath, authorityTemplatePath);
  }
  // CapCut may restore the sibling draft_info.json.bak when it opens a
  // multi-timeline project. The dated pre-v18 backup above preserves the
  // incumbent; keep CapCut's recovery copy aligned with the new candidate so
  // it cannot silently resurrect the superseded timeline on launch.
  fs.copyFileSync(timelinePath, `${timelinePath}.bak`);
  // Multi-timeline CapCut projects also keep a live timeline snapshot in
  // template-2.tmp.  If it is left stale, CapCut silently writes that snapshot
  // back over draft_info.json on launch, resurrecting old/offline material IDs.
  // Keep all three recovery authorities byte-identical for this candidate.
  const timelineTemplatePath = path.join(path.dirname(timelinePath), 'template-2.tmp');
  if (fs.existsSync(timelineTemplatePath)) {
    fs.copyFileSync(timelinePath, timelineTemplatePath);
  }
  const projectMetaTmpPath = `${projectMetaPath}.tmp-${process.pid}`;
  fs.writeFileSync(projectMetaTmpPath, `${JSON.stringify(projectMeta)}\n`);
  fs.renameSync(projectMetaTmpPath, projectMetaPath);

  const manifest = {
    schemaVersion: 'episode-04-v22-smooth-continuity-capcut-overlay-manifest.v1',
    createdAt: new Date().toISOString(),
    timelinePath,
    timelineSha256: sha256(timelinePath),
    timelineRecoveryPaths: [
      `${timelinePath}.bak`,
      ...(fs.existsSync(timelineTemplatePath) ? [timelineTemplatePath] : [])
    ],
    backupPath,
    timelineAuthorityPaths,
    timelineAuthorityBackups,
    projectMetaPath,
    projectMetaSha256: sha256(projectMetaPath),
    projectMetaBackupPath,
    projectMediaAdded: 0,
    baseVideo: { ...config.baseVideo },
    timelineDurationUs: config.timelineDurationUs,
    overlayCount: manifestOverlays.length,
    overlays: manifestOverlays,
    assertions: {
      baseAudioUntouched: true,
      allOverlaysMuted: manifestOverlays.every(() => true),
      captionsBurnedIn: false,
      sourceTimelinePreserved: true,
      publicMutation: false
    }
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`EP04_V22_CAPCUT_TIMELINE_BUILT overlays=${manifest.overlayCount}`);
  console.log(`timeline_sha256=${manifest.timelineSha256}`);
  console.log(`project_meta_sha256=${manifest.projectMetaSha256}`);
  console.log(`project_media_added=${manifest.projectMediaAdded}`);
  console.log(`manifest=${manifestPath}`);
}

main();
