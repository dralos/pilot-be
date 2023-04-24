
const redis = require('redis')

const CACHE_TIME = 60
const redisClient = redis.createClient()
redisClient.on('error', (err) => console.log('Redis Client Error', err))

const cache =  async (req, res, next) => {
    debugger
    if(!redisClient.isOpen) await redisClient.connect();

    const reqUrl = req.originalUrl || req.url 
    const key = `__app__${reqUrl}`
    const data = await redisClient.get(key)
    if(data){
        res.status(304).json({
            message: 'read from cache',
            data: JSON.parse(data)
        })
    }else{
        res.sendResponse = res.send
        res.send = (body) => {
            // maybe add this to be passed 
            // expire in 1 min
            redisClient.setEx(key, CACHE_TIME , JSON.stringify(body))
            res.sendResponse(body) 
        }
        next()
    }
}



module.exports = cache