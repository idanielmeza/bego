import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class GmapsService {
    private logger = new Logger(GmapsService.name)
    private client: AxiosInstance = axios;
    private apiKey : string = process.env.G_MAPS_API_KEY || '';
    private baseUrl : string = process.env.G_MAPS_PLACES_BASE_URL || '';

    async getLocationByPlaceId(placeId: string){
        try {
            const {data} = await this.client.get(this.baseUrl.concat(placeId), {
                headers: {
                    "X-Goog-Api-Key": this.apiKey,
                    "X-Goog-FieldMask": "id,displayName"
                }
            });
            return data;
        } catch (error) {
            this.logger.error(error.message);

            if(error.status === 400) throw new ConflictException('placeId not found');
            
            else throw new InternalServerErrorException(error.data.message);
        }
    }

}
