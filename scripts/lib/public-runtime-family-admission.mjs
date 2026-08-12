const SHA256 = /^[a-f0-9]{64}$/;

export function partitionPublicRuntimeFamilyMembers(members, activeAssets) {
  if (!(members instanceof Map) || !(activeAssets instanceof Map)) {
    throw new TypeError('runtime family members and active assets must be maps');
  }
  const active = [];
  const held = [];
  for (const member of members.values()) {
    if (!member || typeof member.path !== 'string' || !SHA256.test(member.sha256 || '')) {
      throw new Error('runtime family member has invalid public identity');
    }
    const authority = activeAssets.get(member.path);
    if (!authority) {
      held.push(member);
      continue;
    }
    if (authority.sha256 !== member.sha256) {
      throw new Error(`runtime family/registry checksum mismatch: ${member.path}`);
    }
    active.push(member);
  }
  return { active, held };
}
