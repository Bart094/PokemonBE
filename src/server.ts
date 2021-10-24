import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './routes/routes';

const router: Express = express();

/** Logging */
router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** Routes */
router.use('/', routes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
httpServer.listen(5000, () => console.log(`The server is running on port 5000`));

module.exports = httpServer;

