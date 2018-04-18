var isRealString = (StrO)=>{
    return typeof StrO ==='string' && StrO.trim().length>0;
};

module.exports = {
    isRealString
};