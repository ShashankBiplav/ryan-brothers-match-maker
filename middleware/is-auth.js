const jwt = require('jsonwebtoken');

module.exports= (req, res, next)=>{
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not Authorized');
        error.status = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1]; //Authorization header looks like {Authorization: 'Bearer ' + this.props.token} on the front end
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver');
    } catch (error) {
        error.status = 500;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not Authorized');
        error.status = 401;
        throw error;
    }
    req.userId = decodedToken.userId; //setting userId to request
    next();
};
