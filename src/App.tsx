import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// yarn add @date-io/luxon@1.x luxon
import LuxonUtils from '@date-io/luxon';
import './App.css';
import { DateTime } from 'luxon';

const top10Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
];

type FormInputType = {
    textfield: string;
    autocomplete: string;
    datepicker: DateTime | null;
};

export function App() {

    const { register, handleSubmit, setValue, control } = useForm<FormInputType>({
        defaultValues: {
            autocomplete: '',
            datepicker: null,
            textfield: '',
        }
    });

    const [data, setData] = useState({});

    useEffect(() => {
        register('autocomplete');
    }, [register]);

    const onSumit = (data: FormInputType) => {
        setData(data);
        console.log(data);
    };

    const handleFieldChange = (registerName: keyof FormInputType, data: any) => {
        setValue(registerName, data);
    };

    return (
        <>
            <h1>Material UI React + React Hook Form</h1>

            <div id="wrap">
                <div className="left">
                    <form onSubmit={handleSubmit(onSumit)}>
                        <h2>TextField</h2>
                        <TextField
                            id="textfield-demo"
                            name="textfield"
                            label="Textfield"
                            variant="outlined"
                            inputRef={register}
                        />

                        <h2>Autocomplete</h2>
                        <Autocomplete
                            id="autocomplete-demo"
                            options={top10Films}
                            onChange={(_, data) => handleFieldChange('autocomplete', data)}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Combo box"
                                    name="autocomplete"
                                    variant="outlined"
                                />}
                        />

                        <h2>Datepicker</h2>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <Controller
                                as={
                                    <KeyboardDatePicker
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="datepicker-demo"
                                        name="datepicker"
                                        label="Datepicker"
                                        onChange={() => { }}
                                        value={() => { }}
                                    />
                                }
                                control={control}
                                name="datepicker"
                                placeholder="Datepicker"
                            />
                        </MuiPickersUtilsProvider>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disableElevation
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
                <div className="right">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            </div>
        </>
    );
}
