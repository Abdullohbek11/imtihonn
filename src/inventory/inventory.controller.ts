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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Create an inventory item' })
  @ApiResponse({
    status: 201,
    description: 'The inventory item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post('create')
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @ApiOperation({ summary: 'Retrieve all inventory items' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of inventory items.',
  })
  @Get('getall')
  findAll() {
    return this.inventoryService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a single inventory item by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({ status: 200, description: 'Returns the inventory item.' })
  @ApiResponse({ status: 404, description: 'Inventory item not found.' })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an inventory item by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'The inventory item has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Inventory item not found.' })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @ApiOperation({ summary: 'Delete an inventory item by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Inventory item ID' })
  @ApiResponse({
    status: 200,
    description: 'The inventory item has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Inventory item not found.' })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
