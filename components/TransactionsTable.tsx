import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from '@/lib/utils'
import { transactionCategoryStyles } from '@/constants'


const CategoryBatch = ({category}: CategoryBadgeProps)=>{
  const {borderColor,backgroundColor,textColor,chipBackgroundColor} = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;
  return(
    <div className={cn('category-badge',borderColor,chipBackgroundColor )}>
      <div className={cn('size-2 rounded-full',backgroundColor)}></div>
      <p className={cn('text-[12px] font-medium',textColor)}>
        {category}
      </p>
    </div>
  )
}
const TransactionsTable = ({transactions}: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className='bg-[#f9f8fb]'>
        <TableRow>
          <TableHead className="px-2">Transaction</TableHead>
          <TableHead className="px-2">Amount</TableHead>
          <TableHead className="px-2">Status</TableHead>
          <TableHead className="px-2">Date</TableHead>
          <TableHead className="px-2 max-md:hidden">Channel</TableHead>
          <TableHead className="px-2 max-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: Transaction) => {
          const status = getTransactionStatus(new Date(transaction.date))
          const amount = formatAmount(transaction.amount)
          const isDebit = transaction.type === 'debit';
          const isCredit = transaction.type === 'credit';
          return (
            <TableRow key={transaction.id} className={`${isDebit|| amount[0] === '-' ? 'bg-[#FFFBFA]':'bg-[#F6FEF9]'} !over:bg-none`}>
              <TableCell className='max-w-[250px] pl-2 pr-10'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-14 truncate font-semibold text-[#344054]'>
                    { removeSpecialCharacters(transaction.name)}
                  </h1>
                </div>
              </TableCell>

              <TableCell className= {`pl-2 pr-10 font-semibold ${isDebit|| amount[0] === '-' ? 'text-[#F04438]':'text-[#039855]'}`}>
                {isDebit? `-${amount}`: isCredit ? amount: amount}
              </TableCell>
              <TableCell className='pl-2 pr-10'>
                <CategoryBatch category={status} />
              </TableCell>
              <TableCell className='pl-2 pr-10 min-w-32'>
                {formatDateTime(new Date(transaction.date)).dateTime}
              </TableCell>
              <TableCell className='pl-2 pr-10 capitalize min-w-24'>{transaction.paymentChannel}</TableCell>
              <TableCell className='pl-2 pr-10 max-md:hidden'><CategoryBatch category={transaction.category} /></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>

  )
}

export default TransactionsTable