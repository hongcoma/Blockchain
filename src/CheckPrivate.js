var id=admin.nodeInfo.protocols.eth.config.chainId;
if (id>4){
    console.log("Private Network");
}
else{
    console.log("Not Private Network");
}
