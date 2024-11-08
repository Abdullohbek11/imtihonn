import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@ApiTags('contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'Contract created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid contract data.' })
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all contracts' })
  @ApiResponse({
    status: 200,
    description: 'Contracts retrieved successfully.',
  })
  findAll() {
    return this.contractService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a contract by ID' })
  @ApiParam({ name: 'id', description: 'ID of the contract', required: true })
  @ApiResponse({ status: 200, description: 'Contract retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Contract not found.' })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a contract by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the contract to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Contract updated successfully.' })
  @ApiResponse({ status: 404, description: 'Contract not found.' })
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a contract by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the contract to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Contract deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Contract not found.' })
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
