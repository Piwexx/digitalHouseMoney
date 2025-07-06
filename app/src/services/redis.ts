import { createClient, RedisClientType, SetOptions } from "redis";

class RedisService {
  private client: RedisClientType;
  private connectionPromise: Promise<void>;

  constructor() {
    // REDIS_URL: Connection string for the Redis instance (e.g., redis://localhost:6379)
    // Required for RedisService to function.
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      console.error("REDIS_URL is not defined. Redis client will not be initialized correctly.");
      // Throwing an error here might be preferable if Redis is critical at startup
      // throw new Error("REDIS_URL environment variable is not set.");
      // For now, allowing it to proceed, but client operations will likely fail if url is truly undefined.
      // createClient might handle undefined url by defaulting or erroring.
    }
    
    this.client = createClient({
      url: redisUrl, // Use the checked variable
    });

    this.client.on('error', (err) => console.error('Redis Client Error:', err)); // Added colon for clarity

    this.connectionPromise = this.client.connect()
      .then(() => {
        console.log("Successfully connected to Redis");
      })
      .catch((err) => {
        console.error("Failed to connect to Redis:", err);
        // Depending on app's needs, could re-throw or set a flag
        // For now, just logging. Subsequent operations might fail if connection failed.
      });
  }

  private async ensureConnected(): Promise<void> {
    // Await the initial connection promise
    // This ensures that any method call waits for the connection attempt to resolve.
    await this.connectionPromise;
    if (!this.client.isOpen) {
        // This might happen if initial connection failed or was lost and didn't auto-reconnect
        console.warn("Redis client is not open. Attempting to reconnect...");
        try {
            await this.client.connect(); // Try to connect again
            console.log("Reconnected to Redis.");
        } catch (reconnectError) {
            console.error("Failed to reconnect to Redis:", reconnectError);
            throw new Error("Redis client is not connected."); // Throw if reconnect fails
        }
    }
  }

  async set(name: string, value: string, options?: SetOptions): Promise<string | null | undefined> {
    await this.ensureConnected();
    // The 'set' command in node-redis v4 returns 'OK' or null.
    // Let's return what the client returns, or handle potential errors.
    try {
      return await this.client.set(name, value, options);
    } catch (error) {
      console.error(`Redis SET error for key "${name}":`, error);
      throw error; // Re-throw to allow caller to handle
    }
  }

  async get(key: string): Promise<string | null> {
    await this.ensureConnected();
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Redis GET error for key "${key}":`, error);
      throw error; // Re-throw
    }
  }

  // It's good practice to provide a way to disconnect, e.g., for graceful shutdown
  async disconnect(): Promise<void> {
    if (this.client && this.client.isOpen) {
      await this.client.disconnect();
      console.log("Disconnected from Redis.");
    }
  }
}

const redisService = new RedisService();
export default redisService;