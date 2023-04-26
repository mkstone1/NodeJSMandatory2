
function isAdmin(req, res, next) {
    if (req.session.role === "admin") {
        next();
    
    } else {
        res.send({data:"You do not have access"})
    }
}


export default isAdmin;