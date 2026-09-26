import Foundation
import Security

let tagText = "com.laidies.luminairy.signing.r7.20260913.hannah-fry"
let labelText = "LAiDIES LUMINAiRY Hannah Fry recovery signer r7 (2026-09-13)"
let keyId = "luminairy-editorial-offline-r7-20260913"

func fail(_ message: String) -> Never { FileHandle.standardError.write(Data((message + "\n").utf8)); exit(1) }
func b64url(_ bytes: Data) -> String { bytes.base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "") }
func status(_ code: OSStatus) -> String { SecCopyErrorMessageString(code, nil).map { $0 as String } ?? "OSStatus \(code)" }
func privateKey() -> SecKey {
  let query: [String: Any] = [kSecClass as String: kSecClassKey, kSecAttrApplicationTag as String: Data(tagText.utf8), kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom, kSecAttrKeyClass as String: kSecAttrKeyClassPrivate, kSecReturnRef as String: true]
  var item: CFTypeRef?
  let found = SecItemCopyMatching(query as CFDictionary, &item)
  if found == errSecSuccess, let key = item as! SecKey? { return key }
  if found != errSecItemNotFound { fail("Keychain lookup failed: \(status(found))") }
  var accessError: Unmanaged<CFError>?
  guard let access = SecAccessControlCreateWithFlags(nil, kSecAttrAccessibleWhenUnlockedThisDeviceOnly, .privateKeyUsage, &accessError) else { fail("Key access control setup failed") }
  let privateAttrs: [String: Any] = [kSecAttrIsPermanent as String: true, kSecAttrApplicationTag as String: Data(tagText.utf8), kSecAttrLabel as String: labelText, kSecAttrAccessControl as String: access]
  let parameters: [String: Any] = [kSecAttrKeyType as String: kSecAttrKeyTypeECSECPrimeRandom, kSecAttrKeySizeInBits as String: 256, kSecAttrTokenID as String: kSecAttrTokenIDSecureEnclave, kSecPrivateKeyAttrs as String: privateAttrs]
  var error: Unmanaged<CFError>?
  guard let key = SecKeyCreateRandomKey(parameters as CFDictionary, &error) else { fail("Secure Enclave P-256 generation failed: \(error!.takeRetainedValue())") }
  return key
}
func derToP1363(_ der: Data) -> Data? {
  let b = [UInt8](der); guard b.count >= 8, b[0] == 0x30 else { return nil }
  var i = 1; let sequenceLength: Int
  if b[i] & 0x80 == 0 { sequenceLength = Int(b[i]); i += 1 } else { let count = Int(b[i] & 0x7f); i += 1; guard count > 0 && i + count <= b.count else { return nil }; sequenceLength = b[i..<i+count].reduce(0) { $0 << 8 | Int($1) }; i += count }
  guard i + sequenceLength == b.count else { return nil }
  func integer() -> [UInt8]? { guard i < b.count && b[i] == 0x02 else { return nil }; i += 1; guard i < b.count else { return nil }; let length = Int(b[i]); i += 1; guard length > 0 && i + length <= b.count else { return nil }; let raw = Array(b[i..<i+length]); i += length; let trimmed = raw.drop { $0 == 0 }; return Array(trimmed.isEmpty ? [0] : trimmed) }
  guard let r = integer(), let s = integer(), r.count <= 32, s.count <= 32 else { return nil }
  return Data(repeating: 0, count: 32-r.count) + Data(r) + Data(repeating: 0, count: 32-s.count) + Data(s)
}
let args = CommandLine.arguments
if args.count != 3 { fail("Usage: keychain-signer.swift public|sign <output-or-payload-path>") }
let key = privateKey()
if args[1] == "public" {
  guard let publicKey = SecKeyCopyPublicKey(key), let external = SecKeyCopyExternalRepresentation(publicKey, nil) as Data?, external.count == 65, external.first == 0x04 else { fail("Public JWK export failed") }
  var privateExportError: Unmanaged<CFError>?
  if SecKeyCopyExternalRepresentation(key, &privateExportError) != nil { fail("Private key is exportable; refusing insecure signer") }
  let bytes = [UInt8](external)
  let result: [String: Any] = ["keyId": keyId, "publicJwk": ["kty": "EC", "crv": "P-256", "x": b64url(Data(bytes[1...32])), "y": b64url(Data(bytes[33...64]))], "storage": ["kind": "macos-secure-enclave-keychain", "applicationTag": tagText, "accessibility": "when-unlocked-this-device-only", "privateKeyExport": "denied-verified", "custodian": "/root/evening_sources"]]
  let data = try! JSONSerialization.data(withJSONObject: result, options: [.sortedKeys, .prettyPrinted]); try! data.write(to: URL(fileURLWithPath: args[2])); exit(0)
}
if args[1] == "sign" {
  let payload = try! Data(contentsOf: URL(fileURLWithPath: args[2]))
  var error: Unmanaged<CFError>?
  guard let der = SecKeyCreateSignature(key, .ecdsaSignatureMessageX962SHA256, payload as CFData, &error) as Data?, let signature = derToP1363(der), signature.count == 64 else { fail("Keychain signing failed") }
  print(signature.base64EncodedString()); exit(0)
}
fail("Unknown action")
