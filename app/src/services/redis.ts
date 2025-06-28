import { createClient, RedisClientType, SetOptions } from "redis"

class RedisService {

  private client: RedisClientType

  constructor(){
    this.client = createClient({
      url: process.env.REDIS_URL
    })
    
    this.client.connect().then(() => {
      console.log("Connected")
    })
  }

  async set(name:string,value:string,options?: SetOptions){
   this.client.set(name,value,options)
  }
  async get(key:string): Promise<string | null>{
    return this.client.get(key)
  }
}

const redisService = new RedisService()
export default redisService