import { Controller, Get } from "@nestjs/common";

@Controller('/health')
export class HealthController {


  @Get()
  async execute(): Promise<string> {

    return "Alive!"
  }
}