import React from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../../redux/features/events/eventsSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ticketsService from "../../../services/tickets";
import * as Yup from "yup";
import { db } from "../../../utils/firebaseConfig";
import "./CreateEventForm.css";

const CreateEventForm = () => {

  const dispatch = useDispatch();

  const initialValues = {
    place: "",
    time: "",
    capacidad: "",
    price: "",
    image: "",
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    place: Yup.string().required("place es requerido"),
    time: Yup.string().required("Fecha/horario es requerido"),
    capacidad: Yup.number().required("Capacidad es requerida"),
    price: Yup.string().required("price es requerido"),
    image: Yup.string().required("Imagen es requerida"),
    title: Yup.string().required("title es requerido"),
    description: Yup.string().required("Descripción es requerida"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // handle form submission logic here
    const newEvent = await ticketsService.create(values);
    dispatch(addEvent(newEvent));
    console.log(values);
    resetForm();
  };

  return (
    <div className="contenedorF">
      <div className="contenedor2">
        <div className="detail">
          <h2 className="tittleForm">Crea un Evento!!!</h2>
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="title">Nombre</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Nombre del evento"
                  />
                  <ErrorMessage name="title" />
                </div>

                <div>
                  <label htmlFor="place">Lugar</label>
                  <Field
                    type="text"
                    id="place"
                    name="place"
                    placeholder="Lugar del evento"
                  />
                  <ErrorMessage name="place" />
                </div>

                <div>
                  <label htmlFor="time">Fecha/horario</label>
                  <Field
                    type="datetime-local"
                    id="time"
                    name="time"
                    placeholder="Fecha/horario del evento"
                  />
                  <ErrorMessage name="time" />
                </div>

                <div>
                  <label htmlFor="ability">Capacidad</label>
                  <Field
                    type="number"
                    id="ability"
                    name="ability"
                    placeholder="Capacidad del evento"
                  />
                  <ErrorMessage name="ability" />
                </div>

                <div>
                  <label htmlFor="price">Precio</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Precio del evento"
                  />
                  <ErrorMessage name="price" />
                </div>

                <div>
                  <label htmlFor="image">Imagen</label>
                  <Field
                    type={"file"}
                    id="image"
                    name="image"
                    placeholder="Imagen de evento"
                  />
                  <ErrorMessage name="image" />
                </div>

                <div>
                  <label htmlFor="description">Descripcion</label>
                  <Field
                    as="textarea"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Descripcion del evento"
                  />
                  <ErrorMessage name="description" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
