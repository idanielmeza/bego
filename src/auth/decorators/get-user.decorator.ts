import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUserDecorator = createParamDecorator( (data, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    if(!user)
        throw new InternalServerErrorException('User not found');

    if(data && Array.isArray(data) && data.length !== 0){

        const response = {};

        for(const field of data){
            if(user[field])
                response[field] = user[field];
            else
                throw new InternalServerErrorException('Field not found');
        }

        return response;

    }
    
    if(data){

        if(user[data])
            return user[data];

        throw new InternalServerErrorException('Field not found');

    }

    return user;

})