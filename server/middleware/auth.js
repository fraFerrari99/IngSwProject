import jwt from 'jsonwebtoken';

//use of middleware
//EG: user wants to delete a post
//clicks the delete button => auth middleware (next) => delete controller ...
//(it verifies that the user has permission, if so it lets it go to the next step)

//where does it get used? in the routes!
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];  
        let decodedData;

        //apparentemente la stringa 'test' non serve, riesco a decodificarlo comunque, mah
        decodedData = jwt.decode(token);

        if(token && decodedData.id) {    

            req.userId = decodedData?.id;

        } else {

            req.userId = decodedData?.sub;  //google name for specific ID unique to each user

        }
        
        next();     //pass the action to the next step
    } catch (error) {
        console.log(error);
    }
}

export default auth;