import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    return res.json({ 
        message: "Welcome to comment router" 
    });
  });

  router.get('/:id', (req, res) => {
    return res.json({ 
        message: "Comment with id ",
        id: req.params.id 
    });
  });


export default router;