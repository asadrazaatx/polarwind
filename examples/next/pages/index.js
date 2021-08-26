import { useState } from 'react'

export default function Home() {
  const [selected, setSelected] = useState(0)

  const tabs = [
    {
      id: '1',
      content: 'First tab'
    },
    {
      id: '2',
      content: 'Second tab'
    },
    {
      id: '3',
      content: 'Third tab'
    }
  ]

  return (
    <Page>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
      />
    </Page>
  )
}
