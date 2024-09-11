import { Component, ReactElement } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { HOME } from '@/constants/paths'
import { RootState } from '@/store'
import { StateUser } from '@/store/slices/userSlice'
import { Container } from '@/styles/common'

import { Wrapper, Text } from './styled'

type Props = {
    children: ReactElement
    currentUser: StateUser | null
}

type State = {
    hasError: boolean
    errorName: string
    errorMessage: string
}

const initValue: State = {
    hasError: false,
    errorName: '',
    errorMessage: '',
}

class ErrorBoundary extends Component<Props, State> {
    state = initValue

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, errorMessage: error.message, errorName: error.name }
    }

    reloadClickHandler = () => this.setState(initValue)

    render() {
        if (this.state.hasError) {
            return (
                <Container>
                    <Wrapper>
                        <Text>Oops, something went wrong</Text>
                        <Text>{`${this.state.errorName}: ${this.state.errorMessage}`}</Text>
                        <Link to={this.props.currentUser ? HOME : '/'} onClick={this.reloadClickHandler}>
                            Click to reload page
                        </Link>
                    </Wrapper>
                </Container>
            )
        }

        return this.props.children
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.user.currentUser,
    }
}

export default connect(mapStateToProps)(ErrorBoundary)
