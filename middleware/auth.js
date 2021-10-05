import { getAuth } from 'firebase/auth'

export default function ({ route, store, redirect }) {
  getAuth().onAuthStateChanged((user) => {
    if (user) {
      switch (route.name) {
        case 'login':
          redirect('/')
					break
        case 'signin':
          redirect('/')
					break
      }
    } else {
      switch (route.name) {
        case 'index':
          redirect('/login')
					break
      }
    }
  })
}
