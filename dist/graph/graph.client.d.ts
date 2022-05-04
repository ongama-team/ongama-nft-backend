import { ConfigService } from '@nestjs/config';
export default class SubgraphGraphQLClient {
    private configService;
    protected client: any;
    constructor(configService: ConfigService);
}
