// async create(createProductDto: CreateProductDto) {
//   const image = await this.imagesService.findOne(createProductDto.image_id);
//   if (!image) {
//     throw new NotFoundException('Такого изображения не существует.');
//   }
//   const type = await this.typesService.findOne(createProductDto.type_id);
//   if (!type) {
//     throw new NotFoundException('Такой категории не существует.');
//   }

//   if (type.url === 'processor' && !createProductDto.socket) {
//     throw new NotFoundException(
//       'Необходимо указать тип сокета и тип оперативной памяти.',
//     );
//   }

//   if (
//     type.url === 'motherboard' &&
//     (!createProductDto.socket ||
//       !createProductDto.form_factor ||
//       !createProductDto.ram_type ||
//       !createProductDto.ram_capacity)
//   ) {
//     throw new NotFoundException(
//       'Необходимо указать тип сокета, тип оперативной памяти, тип форм фактора и количество допустимых планок оперативной памяти.',
//     );
//   }

//   if (type.url === 'cooling' && !createProductDto.socket) {
//     throw new NotFoundException('Необходимо указать тип сокета.');
//   }

//   if (
//     type.url === 'case' &&
//     (!createProductDto.form_factor ||
//       !createProductDto.gpu_width ||
//       !createProductDto.gpu_height)
//   ) {
//     throw new NotFoundException(
//       'Необходимо указать тип форм фактора, максимальную допустимую ширину видеокарты и максимальную допустимую длину видеокарты.',
//     );
//   }

//   if (
//     type.url === 'videocard' &&
//     (!createProductDto.gpu_width || !createProductDto.gpu_height)
//   ) {
//     throw new NotFoundException(
//       'Необходимо указать ширину видеокарты и длину видеокарты.',
//     );
//   }

//   if (type.url === 'ram' && !createProductDto.ram_type) {
//     throw new NotFoundException('Необходимо указать тип оперативной памяти.');
//   }

//   const { characteristics, ram_type, ...productData } = createProductDto;

//   const product = await this.db.products.create({
//     data: {
//       ...productData,
//       characteristics: {
//         create: characteristics?.map((char) => ({
//           key: char.key,
//           value: char.value,
//           rowKey: char.rowKey,
//         })),
//       },
//       ram_types: {
//         create: ram_type?.map((ram) => ({
//           name: ram.name,
//         })),
//       },
//     },
//   });
//   return product;
// }