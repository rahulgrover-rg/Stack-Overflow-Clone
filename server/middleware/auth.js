import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData?.id;
    const { isMobile } = req.body.systemDetails;
    const currentHour = new Date().getHours();

    if (isMobile && currentHour >= 10 && currentHour < 13) {
        return res.status(403).send('Access restricted during this time on mobile devices.');
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
