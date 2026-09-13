import Foundation
import Security

let tagText = "com.laidies.luminairy.signing.r7.20260913.hannah-fry"
let labelText = "LAiDIES LUMINAiRY Hannah Fry recovery signer r7 (2026-09-13)"
let keyId = "luminairy-editorial-offline-r7-20260913"
func fail(_ message: String) -> Never { FileHandle.standardError.write(Data((message + "\n").utf8)); exit(1) }
func b64url(_ bytes: Data) -> String { bytes.base64EncodedString().replacingOccurrences(of: "+", with: "-").replacingOccurrences(of: "/", with: "_").replacingOccurrences(of: "=", with: "") }
func status(_ code: OSStatus) -> String { SecCopyErrorMessageString(code, nil).map { $0 as String } ?? "OSStatus \(code)" }
func keychain() -> SecKeychain { var kc: SecKeychain?; let result=SecKeychainCopyDefault(&kc); guard result == errSecSuccess, let kc else { fail("Login Keychain unavailable: \(status(result))") }; return kc }
func key() -> SecKey {
  let kc=keychain(); let tag=Data(tagText.utf8)
  let query:[String:Any]=[kSecClass as String:kSecClassKey,kSecUseKeychain as String:kc,kSecAttrApplicationTag as String:tag,kSecAttrKeyType as String:kSecAttrKeyTypeECSECPrimeRandom,kSecAttrKeyClass as String:kSecAttrKeyClassPrivate,kSecReturnRef as String:true]
  var found:CFTypeRef?; let existing=SecItemCopyMatching(query as CFDictionary,&found)
  if existing == errSecSuccess, let key=found as! SecKey? { return key }
  if existing != errSecItemNotFound { fail("Classic Keychain lookup failed: \(status(existing))") }
  let attributes:[String:Any]=[kSecAttrKeyType as String:kSecAttrKeyTypeECSECPrimeRandom,kSecAttrKeySizeInBits as String:256,kSecAttrIsPermanent as String:true,kSecAttrApplicationTag as String:tag,kSecAttrLabel as String:labelText,kSecUseKeychain as String:kc]
  var publicKey:SecKey?; var privateKey:SecKey?; let generated=SecKeyGeneratePair(attributes as CFDictionary,&publicKey,&privateKey)
  guard generated == errSecSuccess, let privateKey else { fail("Classic login-Keychain P-256 generation failed: \(status(generated))") }
  // File-based login-Keychain protection is the supported storage boundary here.
  return privateKey
}
func derToP1363(_ der: Data) -> Data? { let b=[UInt8](der); guard b.count >= 8,b[0] == 0x30 else{return nil}; var i=1; let n:Int; if b[i]&0x80==0 {n=Int(b[i]);i+=1} else {let c=Int(b[i]&0x7f);i+=1;guard c>0,i+c<=b.count else{return nil};n=b[i..<i+c].reduce(0){$0<<8|Int($1)};i+=c}; guard i+n==b.count else{return nil}; func integer()->[UInt8]?{guard i<b.count,b[i]==0x02 else{return nil};i+=1;guard i<b.count else{return nil};let c=Int(b[i]);i+=1;guard c>0,i+c<=b.count else{return nil};let a=Array(b[i..<i+c]);i+=c;let t=a.drop{$0==0};return Array(t.isEmpty ? [0] : t)}; guard let r=integer(),let s=integer(),r.count<=32,s.count<=32 else{return nil};return Data(repeating:0,count:32-r.count)+Data(r)+Data(repeating:0,count:32-s.count)+Data(s) }
let args=CommandLine.arguments; if args.count != 3 { fail("Usage: classic-login-keychain-signer.swift public|sign <path>") }; let privateKey=key()
if args[1] == "public" { guard let publicKey=SecKeyCopyPublicKey(privateKey),let raw=SecKeyCopyExternalRepresentation(publicKey,nil) as Data?,raw.count==65,raw.first==0x04 else {fail("Public JWK export failed")};let bytes=[UInt8](raw);let result:[String:Any]=["keyId":keyId,"publicJwk":["kty":"EC","crv":"P-256","x":b64url(Data(bytes[1...32])),"y":b64url(Data(bytes[33...64]))],"storage":["kind":"macos-classic-login-keychain","applicationTag":tagText,"keychain":"login.keychain-db","accessControl":"file-based login-Keychain default ACL","privateKeyExport":"not requested or written","custodian":"/root/evening_sources"]];let data=try! JSONSerialization.data(withJSONObject:result,options:[.sortedKeys,.prettyPrinted]);try! data.write(to:URL(fileURLWithPath:args[2]));exit(0) }
if args[1] == "sign-der" { let payload=try! Data(contentsOf:URL(fileURLWithPath:args[2]));var error:Unmanaged<CFError>?;guard let der=SecKeyCreateSignature(privateKey,.ecdsaSignatureMessageX962SHA256,payload as CFData,&error) as Data? else {fail("Classic Keychain signing failed")};print(der.base64EncodedString());exit(0) }
if args[1] == "sign" { let payload=try! Data(contentsOf:URL(fileURLWithPath:args[2]));var error:Unmanaged<CFError>?;guard let der=SecKeyCreateSignature(privateKey,.ecdsaSignatureMessageX962SHA256,payload as CFData,&error) as Data?,let sig=derToP1363(der),sig.count==64 else {fail("Classic Keychain signing failed")};print(sig.base64EncodedString());exit(0) }
fail("Unknown action")
