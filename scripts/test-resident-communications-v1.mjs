import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [
  tradingPage,
  postOffice,
  giftClient,
  chatPage,
  chatClient,
  navAuth,
  giftMigration,
  chatMigration
] = await Promise.all([
  read("games/trading-cards.html"),
  read("post-office.html"),
  read("content/site/resident-card-gifting-v1.js"),
  read("resident-chat.html"),
  read("content/site/resident-chat-v1.js"),
  read("content/site/sv-nav-auth.js"),
  read("supabase/migrations/20260727213000_authoritative_trading_card_gifts.sql"),
  read("supabase/migrations/20260727214500_resident_chat_v1.sql")
]);

assert.doesNotMatch(tradingPage, /id="resetBtn"/);
assert.doesNotMatch(tradingPage, /laidies_card_collection/);
assert.doesNotMatch(tradingPage, /function\s+rollRarity/);
assert.match(tradingPage, /\.rpc\('open_pack'/);
assert.match(tradingPage, /\.rpc\('my_trading_cards'/);

assert.match(postOffice, /data-resident-card-gifting/);
assert.match(postOffice, /resident-card-gifting-v1\.js/);
assert.match(postOffice, /href="\/resident-chat\.html"/);
assert.match(giftClient, /\.rpc\("send_duplicate_trading_card"/);
assert.match(giftClient, /p_idempotency_key/);

assert.match(giftMigration, /reward_type <> 'trading_card'/);
assert.match(giftMigration, /current_count < 2/);
assert.match(giftMigration, /on conflict \(user_id, dedupe_key\) do update/);
assert.match(giftMigration, /item_type = 'trading_card'.*use-card-gift/s);
assert.match(giftMigration, /unique \(from_user_id, idempotency_key\)/);

assert.match(chatPage, /data-direct-form/);
assert.match(chatPage, /data-group-form/);
assert.match(chatClient, /\.rpc\("create_direct_resident_chat"/);
assert.match(chatClient, /\.rpc\("create_group_resident_chat"/);
assert.match(chatClient, /\.rpc\("send_resident_chat_message"/);
assert.match(chatClient, /\.rpc\("report_resident_chat_message"/);
assert.match(chatMigration, /resident_conversation_members/);
assert.match(chatMigration, /resident_message_reports/);
assert.match(chatMigration, /resident_blocks/);
assert.match(chatMigration, /alter publication supabase_realtime add table public\.resident_messages/);

assert.match(navAuth, /my_resident_conversations/);
assert.match(navAuth, /href = '\/resident-chat\.html'/);

console.log("RESIDENT COMMUNICATIONS V1 STATIC CONTRACT PASS");
console.log("trading=server-authoritative gifts=duplicate-only chat=direct+group notifications=sitewide");
