import { CategoryType } from '#constants/category_type'
import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        name: 'Aluguel',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Pró-labore',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Salário',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Prestação de serviço',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Cashback',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Dividendos',
        type: CategoryType.CREDIT,
      },
      {
        name: 'JSCP',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Rendimento de aplicação financeira',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Resgate de aplicação financeira',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Transferência entre contas',
        type: CategoryType.CREDIT,
      },
      {
        name: 'Outras Receitas',
        type: CategoryType.CREDIT,
      },
    ])

    await Category.createMany([
      {
        name: 'Aluguel',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Água',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Luz',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Internet',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Telefone',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Academia',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Combustível',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Manutenção do veículo',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Uber e/ou Transporte público',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Seguro de carro',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Investimentos',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Supermercado',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Restaurante e/ou lanches',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Delivery',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Saúde',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Educação',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Lazer',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Vestuário',
        type: CategoryType.DEBIT,
      },
      {
        name: 'IPVA',
        type: CategoryType.DEBIT,
      },
      {
        name: 'IPTU',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Juros',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Taxas',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Multa',
        type: CategoryType.DEBIT,
      },
      {
        name: 'IRPJ',
        type: CategoryType.DEBIT,
      },
      {
        name: 'DAS (Simples Nacional)',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Guia INSS e IRRF',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Retirada de Pró-labore',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Distribuição de lucro',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Contabilidade',
        type: CategoryType.DEBIT,
      },
      {
        name: 'Transferência entre contas',
        type: CategoryType.DEBIT,
      },
    ])
  }
}
