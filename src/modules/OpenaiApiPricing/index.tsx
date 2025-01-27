import React, { useState } from 'react'
import { Button } from '@components/buttons'
import ModuleHeader from '@components/layouts/module/ModuleHeader'
import ModuleWrapper from '@components/layouts/module/ModuleWrapper'
import APIFallbackComponent from '@components/screens/APIComponentWithFallback'
import EmptyStateScreen from '@components/screens/EmptyStateScreen'
import Scrollbar from '@components/utilities/Scrollbar'
import useFetch from '@hooks/useFetch'
import useThemeColors from '@hooks/useThemeColor'
import RawHTMLInputModal from './components/RawHTMLInputModal'

function formatPrice(
  price: { amount: number; usage: string } | undefined
): string {
  if (price === undefined) return ''
  return `$${price.amount} / ${price.usage}`
}

function hasBatch(prices: any[]): boolean {
  return prices.some(e => Object.keys(e).includes('batch'))
}

function OpenaiApiPricing(): React.ReactElement {
  const [data, refreshData] =
    useFetch<Record<string, any>>('openai-api-pricing')
  const [isInputRawHTMLModalOpen, setIsInputRawHTMLModalOpen] = useState(false)
  const { componentBgLighter } = useThemeColors()

  return (
    <ModuleWrapper>
      <ModuleHeader
        title="OpenAI API Pricing"
        icon="tabler:brand-openai"
        actionButton={
          <Button
            onClick={() => {
              setIsInputRawHTMLModalOpen(true)
            }}
            icon="tabler:code"
            className="hidden md:flex"
          >
            Input Raw HTML
          </Button>
        }
      />
      <APIFallbackComponent data={data}>
        {data => (
          <div className="mt-6 flex-1">
            {JSON.stringify(data) === '{}' ? (
              <EmptyStateScreen
                title="No data available"
                description="Please input raw HTML to get pricing information"
                icon="tabler:article-off"
              />
            ) : (
              <Scrollbar>
                <div className="mb-6 space-y-4">
                  {Object.entries(data).map(([key, value]) => (
                    <div
                      key={key}
                      className={`p-6 ${componentBgLighter} rounded-lg`}
                    >
                      <h2 className="relative pl-4 text-2xl font-semibold before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:rounded-full before:bg-custom-500">
                        {key}
                      </h2>
                      <p className="mt-2 text-bg-500">{value.description}</p>
                      <div className="overflow-x-auto">
                        {(() => {
                          if (key.includes('Image')) {
                            return (
                              <table className="mt-6 w-full">
                                <thead>
                                  <tr>
                                    <th className="w-1/4 px-2 text-left text-lg font-semibold">
                                      <div className="min-w-32">Model</div>
                                    </th>
                                    <th className="w-3/4 p-2 text-left text-lg font-semibold">
                                      <div className="flex">
                                        <div className="w-1/3 min-w-48">
                                          Quality
                                        </div>
                                        <div className="w-1/3 min-w-48">
                                          Resolution
                                        </div>
                                        <div className="w-1/3 min-w-48">
                                          Price
                                        </div>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.entries(value.data).map(
                                    ([model, items], index) => (
                                      <tr
                                        key={JSON.stringify(items)}
                                        className={
                                          index !==
                                          Object.entries(value.data).length - 1
                                            ? 'border-b-2 border-bg-100 dark:border-bg-800'
                                            : ''
                                        }
                                      >
                                        <td className="px-2">{model}</td>
                                        <td className="p-2">
                                          {(items as any[]).map((item: any) => (
                                            <div
                                              key={JSON.stringify(item)}
                                              className="flex"
                                            >
                                              <div className="w-1/3 text-bg-700 dark:text-bg-300">
                                                {item.quality}
                                              </div>
                                              <div className="w-1/3 text-bg-700 dark:text-bg-300">
                                                {item.resolution
                                                  .map((res: number[]) =>
                                                    res.join('x')
                                                  )
                                                  .join(', ')}
                                              </div>
                                              <div className="w-1/3 text-bg-700 dark:text-bg-300">
                                                {formatPrice(item.price)}
                                              </div>
                                            </div>
                                          ))}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            )
                          }

                          const hasBatchPrice = hasBatch(
                            Object.values(value.data).flat()
                          )

                          return (
                            <table className="mt-6 w-full">
                              <thead>
                                <tr>
                                  <th className="w-1/3 px-2 text-left text-lg font-semibold">
                                    <div className="min-w-32">Model</div>
                                  </th>
                                  <th className="w-2/3 p-2 text-left text-lg font-semibold">
                                    <div className="flex">
                                      <div
                                        className={`${
                                          hasBatchPrice ? 'w-1/2' : 'w-full'
                                        } min-w-72`}
                                      >
                                        Price
                                      </div>
                                      {hasBatchPrice && (
                                        <div className="w-1/2 min-w-72">
                                          Price with Batch API
                                        </div>
                                      )}
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(value.data).map(
                                  ([model, prices], index) => (
                                    <tr
                                      key={model}
                                      className={`${
                                        index !==
                                          Object.entries(value.data).length -
                                            1 &&
                                        'border-b-2 border-bg-100 dark:border-bg-800'
                                      }`}
                                    >
                                      <td className="px-2">{model}</td>
                                      <td className="p-2">
                                        <table className="w-full">
                                          <tbody>
                                            {(prices as any[]).map(e => (
                                              <tr key={JSON.stringify(e)}>
                                                {(() => {
                                                  if (
                                                    Object.keys(e).includes(
                                                      'type'
                                                    )
                                                  ) {
                                                    return (
                                                      <>
                                                        <td className="w-full">
                                                          <div className="font-semibold">
                                                            {e.type}
                                                          </div>
                                                          {(
                                                            e.items as any[]
                                                          ).map(item => (
                                                            <div
                                                              key={JSON.stringify(
                                                                item
                                                              )}
                                                              className="text-bg-700 dark:text-bg-300"
                                                            >
                                                              {formatPrice(
                                                                item
                                                              )}
                                                            </div>
                                                          ))}
                                                        </td>
                                                      </>
                                                    )
                                                  } else {
                                                    return (
                                                      <>
                                                        <td
                                                          className={`${
                                                            hasBatchPrice
                                                              ? 'w-1/2'
                                                              : 'w-full'
                                                          } text-bg-700 dark:text-bg-300`}
                                                        >
                                                          {formatPrice(
                                                            e.single
                                                          )}
                                                        </td>
                                                        {hasBatchPrice && (
                                                          <td className=" text-bg-700 dark:text-bg-300">
                                                            {formatPrice(
                                                              e.batch
                                                            )}
                                                          </td>
                                                        )}
                                                      </>
                                                    )
                                                  }
                                                })()}
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          )
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </Scrollbar>
            )}
          </div>
        )}
      </APIFallbackComponent>
      <RawHTMLInputModal
        isOpen={isInputRawHTMLModalOpen}
        setIsOpen={setIsInputRawHTMLModalOpen}
        refreshData={refreshData}
      />
    </ModuleWrapper>
  )
}

export default OpenaiApiPricing
