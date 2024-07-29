import NodeCache from 'node-cache';


const cache = new NodeCache({ stdTTL: 600, checkperiod: 60 });

export default cache;