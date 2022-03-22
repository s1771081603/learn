export function logPoint(account, optkeyword, sourceid, marketname) {
  logPointService(account, "uservisit", optkeyword, "", "", "", "", "", "", sourceid, "", marketname);
}
function logPointService(account, module, optkeyword, fromId, flag, fileId, fileType, fileExtname, fileSize, sourceid, linkid, marketname) {
  $.ajax({
    type: "post",
    dataType: "json",
    async: false,
    url: "/portal/journaling",
    data: {
      account: account,
      module: module,
      optkeyword: optkeyword,
      fromId: fromId,
      flag: flag,
      fileId: fileId,
      fileType: fileType,
      fileExtname: fileExtname,
      fileSize: fileSize,
      sourceid: sourceid,
      linkId: linkid,
      marketname: marketname
    },
    success: function(root) {
    }
  });
}