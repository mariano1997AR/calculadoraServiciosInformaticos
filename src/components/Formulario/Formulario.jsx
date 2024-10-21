import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Formulario.css';

export const Formulario = () => {
    //datos en memoria para cargarlos en el select
    const nivelesTrabajo = ['Junior', 'mid-level', 'Senior'];
    const marcosTrabajo = ['React', 'Angular', 'Java Springboot'];
    const basesDatos = ['MySQL', 'postgresql', 'Mongo DB']

    //Salario 
    /*
       junior = 800.000 pesos por mes es igual en dias a 26 mil pesos y 3334 por horas (se usa de base 8 horas)
       semisenior = 1.500.000 pesos por mes es igual en un dia a 50 mil pesos y por hora es 6250 horas (se usa de base 8 horas)
       senior = 3.000.000 pesos por mes es igual en un dia a 100.000 mil pesos y por hora es 12500 pesos (se usa de base 8 horas)


         
    */

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Estado para mostrar mensaje de error
    const [error, setError] = useState('');

    //Estado para habilitar o deshabilitar select
    const [isSelectedEnabled, setIsSelecteEnabled] = useState(false);
    const [isSelectedDB, setIsSelectedDB] = useState('');

    //estado para habilitar el spinning 
    const [isLoading, setIsLoading] = useState(false);

    //Estado para manejar la opcion seleccionada
    const [selectedOption, setSelectedOption] = useState('Junior');
    const [selectedTecnologia, setSelectedTecnologia] = useState('React');
    const [selectedDB, setSelectedDB] = useState('MySQL');
    const [valorHora, setValorHora] = useState('');
    const [resultadoSueldoHora, setResultadoSueldoHora] = useState(0);
    const [resultadoSueldoMes, setResultadoSueldoMes] = useState(0);
    const [resultadoValorTrabajo, setResultadoValorTrabajo] = useState(0);

    //Manejador del cambio del valor/hora
    const handleValorChange = (e) => {
        let valor_hora = e.target.value;
        setValorHora(valor_hora);

        //Validacion en tiempo real
        if (valor_hora.length < 1) {
            setError('El valor tiene que tener al menos 1 caracteres');
        } else {
            setError('');
        }


    }

    const calcularResultados = (valor) => {
        const salarios = [800000, 1500000, 3000000];
        const hora = 8;
        const mes = 30;
        let salario;
        let calcularHora;
        let calcularMes;
        let calcularResultado;
        switch (valor) {
            case 'Junior':
                salario = salarios[0];
                calcularHora = Math.round(((salario / mes) / hora));
                calcularMes = Math.round((salario / mes));
                calcularResultado = calcularHora * valorHora;
                setResultadoSueldoHora(calcularHora);
                setResultadoSueldoMes(calcularMes);
                setResultadoValorTrabajo(calcularResultado);
                break;
            case 'mid-level':
                salario = salarios[1];
                calcularHora = Math.round(((salario / mes) / hora));
                calcularMes = Math.round((salario / mes));
                calcularResultado = calcularHora * valorHora;
                setResultadoSueldoHora(calcularHora);
                setResultadoSueldoMes(calcularMes);
                setResultadoValorTrabajo(calcularResultado);

                break;
            case 'Senior':
                salario = salarios[2];
                calcularHora = Math.round(((salario / mes) / hora));
                calcularMes = Math.round((salario / mes));
                calcularResultado = calcularHora * valorHora;
                setResultadoSueldoHora(calcularHora);
                setResultadoSueldoMes(calcularMes);
                setResultadoValorTrabajo(calcularResultado);
                break;
        }



    };

    // Manejador del checkbox
    const handleCheckboxChange = () => {
        setIsSelecteEnabled(!isSelectedEnabled);
        setSelectedOption(''); // Reiniciamos la opción seleccionada al desactivar el select
    };

    //Manejador del checkbox para uso de base de datos
    const handleCheckDB = () => {
        setIsSelectedDB(!isSelectedDB);
        setSelectedTecnologia('');
    }
    //Manejador de cambios cuando se selecciona una opcion
    const handleSelectChange = (event) => {
        const valor = event.target.value;
        setSelectedOption(valor);

        //Formula del calculo de servicios
        calcularResultados(valor);

    };

    //Manejador de cambios de las tecnologias
    const handleSelectedTecnologias = (e) => {
        setSelectedTecnologia(e.target.value);

    };

    //Manejador de cambios en el selector de bases de datos
    const handleSelectedDB = (e) => {
        setSelectedDB(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);



        //Validacion antes de enviar
        if (valorHora.length < 1) {
            setError('El valor debe tener al menos 1 caracteres antes de enviar');
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);

    };

    useEffect(() => {
        if (valorHora.length < 1) {
            setError('El valor debe tener al menos 1 caracteres antes de enviar');
        }
    }, []);

    return (
        <>
            <div className='container'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Label>Hora: </Form.Label>
                        <Form.Control type="number" value={valorHora} onChange={handleValorChange} placeholder="Ingresa valor hora" />
                        {/* Mostrar mensaje de error si existe */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Form.Group>

                    <Form.Group className='mb-3 ' controlId="exampleForm.ControlInput1">
                        <Form.Label>Selecciona el expertise</Form.Label>
                        <Form.Select value={selectedOption} onChange={handleSelectChange} aria-label="Default select example">
                            <option value="">--Selecciona un nivel--</option>
                            {nivelesTrabajo.map((option, index) => (
                                <option key={index} value={option}>
                                    {option.toLocaleUpperCase()}
                                </option>
                            ))}
                        </Form.Select>

                        <p>Nivel de expertise: {selectedOption}</p>

                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Utilizar framework(si no es asi se usa vanilla js)"
                            checked={isSelectedEnabled}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Label>Seleccione el Framework:</Form.Label>
                        <Form.Select value={selectedTecnologia} onChange={handleSelectedTecnologias} disabled={!isSelectedEnabled} aria-label="Default select example">
                            <option value="">--Selecciona frameworks--</option>
                            {marcosTrabajo.map((option, index) => (
                                <option key={index} value={option}>
                                    {option.toUpperCase()}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3 ' controlId="exampleForm.ControlInput1">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Utilizar base de datos"
                            checked={isSelectedDB}
                            onChange={handleCheckDB}
                        />
                        <Form.Select value={selectedDB} onChange={handleSelectedDB} disabled={!isSelectedDB}>
                            <option value="">--Seleccione una base de datos--</option>
                            {basesDatos.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Form.Select>

                    </Form.Group>
                    {/* Es un boton para calcular los campos */}
                    <div className="d-grid gap-2">
                        {!isLoading ? (
                            <Button type='submit' id='btn-calcular' variant='primary' disabled={!!error} onClick={handleShow}>
                                Calcular
                            </Button>
                        ) : (
                            <div>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <p>Procesando... por favor espera.</p>
                            </div>
                        )}
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Calculo para Proyecto</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedOption === 'Junior' || isSelectedEnabled || isSelectedDB ? (
                                <div>
                                    <h2>{selectedOption.toUpperCase()}</h2>
                                    <p>Hora: ${resultadoSueldoHora}</p>
                                    <p>Mes: ${resultadoSueldoMes}</p>
                                    <p>Marco de trabajo: {selectedTecnologia}</p>
                                    <p>Base de datos: {selectedDB}</p>
                                    <p>Gastos: {resultadoValorTrabajo}</p>
                                </div>

                            ) : selectedOption === 'mid-level' || isSelectedEnabled || isSelectedDB ? (
                                <div>
                                    <h2>{selectedOption.toUpperCase()}</h2>
                                    <p>Hora: ${resultadoSueldoHora}</p>
                                    <p>Mes: ${resultadoSueldoMes}</p>
                                    <p>Marco de trabajo: {selectedTecnologia}</p>
                                    <p>Base de datos: {selectedDB}</p>
                                    <p>Gastos: {resultadoValorTrabajo}</p>

                                </div>

                            ) : selectedOption === 'Senior' || isSelectedEnabled || isSelectedDB ? (
                                <div>
                                    <h2>{selectedOption.toUpperCase()}</h2>
                                    <p>Hora: ${resultadoSueldoHora}</p>
                                    <p>Mes: ${resultadoSueldoMes}</p>
                                    <p>Marco de trabajo: {selectedTecnologia}</p>
                                    <p>Base de datos: {selectedDB}</p>
                                    <p>Gastos: ${resultadoValorTrabajo}</p>
                                </div>
                            ) : (
                                <p></p>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>



                </Form>


            </div>
        </>
    )
}


