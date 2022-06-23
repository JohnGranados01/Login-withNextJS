import { ModalCustom } from "../src/components/Modal"

export default function dashboard() {

  const first_time = localStorage.getItem('first_time') === 'true'
  return (
    <div>
        {first_time && (<ModalCustom></ModalCustom>)}
        dashboard
    </div>
  )
}
