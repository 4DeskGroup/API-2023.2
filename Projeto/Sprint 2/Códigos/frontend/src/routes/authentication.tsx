import { Navigate } from 'react-router-dom'

export function PrivateRouteParceiro({ children }: any) {
    const usuarioJson = sessionStorage.getItem('UsuarioLogado')

    if (usuarioJson) {
        const usuarioObj = JSON.parse(usuarioJson)
        
        return usuarioObj.UsuarioTipo === 'Parceiro' ? children : <Navigate to={'/'} />
    } else {
        return <Navigate to={'/'} />
    }
}

export function PrivateRouteEstabelecimento({ children }: any) {
    const usuarioJson = sessionStorage.getItem('UsuarioLogado')

    if (usuarioJson) {
        const usuarioObj = JSON.parse(usuarioJson)

        return usuarioObj.UsuarioTipo === 'Estabelecimento' ? children : <Navigate to={'/'} />
    } else {
        return <Navigate to={'/'} />
    }
}
