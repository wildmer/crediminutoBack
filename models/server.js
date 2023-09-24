import { connection } from '../database/connection.js';
import { createDefaultRoles } from '../libs/initialSetup.js';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import CONFIG from "../config.js";
import * as routes from "../routes/index.js";

// TODO: revision de peticiones put con arrays en su estructura body. !! estructure de forma no correcta los datos
// routes
// import routerAllotment from '../routes/allotment.js';
// import authRouter from '../routes/auth.js';
// import { routerBilling } from '../routes/billing.js';
// import { routerCost } from '../routes/cost.js';
// import { routerFarm } from '../routes/farm.js';
// import { routerInventory } from '../routes/inventory.js';
// import { routerMark } from '../routes/mark.js';
// import routerOrder from '../routes/orders.js';
// import routerPeople from '../routes/people.js';
// import { routerPhase } from '../routes/phase.js';
// import { routerStore } from '../routes/store.js';
// import routerUser from '../routes/user.js';
// import { routerTypeOutlay } from '../routes/typeOutlay.js';
// import { routerWork } from '../routes/work.js';
// import { routerTransformation } from '../routes/transformation.js';

class Server {
    constructor() {
        this.app = express();
        this.connect();
        this.middlewares();
        this.routes();
    }

    async connect() {
        await connection();
        createDefaultRoles(); // verificar su lugar
        // createCategory();
    }

    middlewares() {
        this.app.use(morgan('short'));
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/auth', routes.authRouter );
        // this.app.use('/bodega', routerStore );
        // this.app.use('/costo', routerCost );
        // this.app.use('/etapa', routerPhase );
        // this.app.use('/facturacion', routerBilling );
        // this.app.use('/granja', routerFarm );
        // this.app.use('/inventario', routerInventory );
        // this.app.use('/lote', routerAllotment );
        // this.app.use('/marca', routerMark );
        // this.app.use('/pedido', routerOrder );
        // this.app.use('/persona', routerPeople );
        this.app.use('/usuario', routes.routerUser );
        // this.app.use('/tipogasto', routerTypeOutlay );
        // this.app.use('/labor', routerWork );
        // this.app.use('/transformation', routerTransformation );
        this.app.use('/',(req, res)=>{
            return res.status(200).send('hola mundo :)');
        });
    }

    listen() {
        this.app.listen(CONFIG.PORT, () => { console.log('Server Online: ', CONFIG.PORT); });
    }
}

export default Server;