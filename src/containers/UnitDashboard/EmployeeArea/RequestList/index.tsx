import List from '../../../../components/List'

interface ListProps {
  appointments: Appointment[]
}

interface ItemProps {}

const RequestItem: React.FC<ItemProps> = (props) => {
  return (
    <>
    {/* escrever list item com timeinput que trigger edit appointment e muda hora*/}
    </>
  )
}

const RequestList: React.FC<ListProps> = ({ appointments }) => {
  return (
    <>
      <h2 style={{ fontSize: 18, fontWeight: 'bold' }}>
        Solicitações
      </h2>
      <List
        count={appointments.length}
        showing={4}
        renderItem={({ index, style }: any) => {
          const item: Appointment = appointments[index]
          // escrever return do requestItem
        }}
      />
    </>
  )
}

export default RequestList