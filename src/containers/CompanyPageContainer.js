import React, { Component } from 'react';
import '../static/BookablePage.css';
import NotFoundPage from '../components/layout/NotFoundPage';
import BookingSlidebar from '../components/bookables/BookingsSlidebar';
import PropTypes from 'prop-types';
import { bookablesActions } from '../data/bookables';
import { companyActions } from '../data/company';
import { connect } from 'react-redux';

class CompanyPageContainer extends Component {

    static propTypes = {
        getCompany: PropTypes.func,
        getCompanyBookables: PropTypes.func,
        company: PropTypes.object,
        companyBookables: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.state = { company: {}, companyBookables: [] };
    }

    componentDidMount() {
        // Om fler saker behöver hämtas i framtiden, så gör om till en getCompanyPage så att enbart en funktion behöver kallas på
        this.props.getCompany(this.props.match.params.id);
        this.props.getCompanyBookables(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.company !== this.props.company) {
            this.setState({
               company: nextProps.company,
            });
        } else if (nextProps.companyBookables !== this.props.companyBookables) {
            this.setState({
               companyBookables: nextProps.companyBookables,
            });
        } else if (nextProps.match.params.id !== this.props.match.params.id) {
            this.props.getCompany(nextProps.match.params.id);
            this.props.getCompanyBookables(nextProps.match.params.id);
        }
    }

    render() {
        const { company }  = this.state;
        if (!company) {
            return <NotFoundPage/>;
        }
        const headerStyle = { backgroundImage: `url(${company.cover})` };
        return (
            <div className="booking-full">
                <div className="booking">
                    <header style={headerStyle}/>
                    <div className="picture-container">
                        <img alt="" src={company.image}/>
                        <h2 className="name">{company.name}</h2>
                    </div>
                    <section className="description">
                        {company.info}
                    </section>
                    <BookingSlidebar barType="company" bookables={this.state.companyBookables}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    company: state.company.company,
    companyBookables: state.bookables.companyBookables,
});

const mapDispatchToProps = {
    getCompany: companyActions.getCompany,
    getCompanyBookables: bookablesActions.getCompanyBookables,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPageContainer);

