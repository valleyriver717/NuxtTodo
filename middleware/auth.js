import { getAuth } from 'firebase/auth'

export default function ({ route, store, redirect }) {
  // 画面遷移時にエラーメッセージを削除
  store.commit('setError', {
    code: '',
    message: '',
  })
  // アクセス権を管理
  getAuth().onAuthStateChanged((user) => {
    // 強制リダイレクト
    switch (route.name) {
      case 'index':
        redirect('/todos')
        break
    }
    // アクセス権制御
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
        case 'todos-:id-edit':
          redirect('/login')
          break
      }
    }
  })
}
