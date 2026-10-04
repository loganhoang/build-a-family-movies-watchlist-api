
export const authorizeModification = (req, res, next )=>{
    const user = req.user;
    const { userId } = req.params;

    if(user.role === 'parent' || user.role === 'child' && String(user.id) === String(userId)){
        return next();
    }

    return res.status(403).json({
         error: "Access denied" 
    })
};