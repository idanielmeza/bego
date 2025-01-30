import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetHeadersDecorator = createParamDecorator( (data, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();

    const headers = req.rawHeaders;

    if(!headers)
        throw new InternalServerErrorException('Headers not found');

    if(data && Array.isArray(data) && data.length !== 0){

            const response = {};
    
            for(const field of data){
                if(headers[field])
                    response[field] = headers[field];
                else
                    throw new InternalServerErrorException('Field not found');
            }
    
            return response;
    }

    if(data){

        if(headers[data])
            return headers[data];

        throw new InternalServerErrorException('Field not found');

    }

    return headers;

})