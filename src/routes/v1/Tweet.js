import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ 
        message: "Welcome to Tweet router" 
    });
  });

  router.get('/:id', (req, res) => {
    return res.json({ 
        message: "Tweet with id ",
        id: req.params.id 
    });
  });


export default router;