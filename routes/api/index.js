import reflectionRouter from './reflection';
import express from 'express';

var router = express.Router();

router.get('test', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

router.use('/reflections', reflectionRouter);

module.exports = router;