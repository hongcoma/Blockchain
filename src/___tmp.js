console.log(JSON.stringify(admin.nodeInfo));
console.log("\n");
console.log(Object.keys(admin.nodeInfo));
console.log("\n");
var t=admin.nodeInfo;
console.log(Object.keys(t.protocols.eth));
