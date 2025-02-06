// imports
import { useRef, useState } from "react";
import { Parser } from "expr-eval";

import codice1 from "../../assets/codice1.png"
import codice2 from "../../assets/codice2.png"
import codice3 from "../../assets/codice3.png"

export const MainPage = () => {
    const [espressione, setEspressione] = useState<string>();
    const [iterazioni, setIterazioni] = useState<number>(1);
    const [precisione, setPrecisione] = useState<number>(2);
    const [intervallo, setIntervallo] = useState<{min: number, max: number}>({min: 0, max: 0});
    const [risultato, setRisultato] = useState<number>(0)
    const [listaOperazione, setListaOperazioni] = useState<number[]>([]);
    
    const popUp = useRef<HTMLDialogElement | null>(null);
    const [titoloPopUp, setTitoloPopUp] = useState<string>("");
    const [testoPopUp, setTestoPopUp] = useState<string>("");


    const valutaFunzione = (x: number): number | null => {
        if(espressione == null)return null

        try {
            const parser = new Parser();
            if (!/^[\d+\-*/().x\s^]+$/.test(espressione)) {throw new Error();}
            const expr = parser.parse(espressione);
            const variables = expr.variables();
            if (variables.some((v) => v !== "x")) {throw new Error();}
            const value = expr.evaluate({ x: x });
            console.log(value)
            return value;
        } catch (error) {
            return null;
        }

    };
    
    const elaboraFunzione = () => {
        var n1, n2; 
        n1 = valutaFunzione(intervallo.min);
        n2 = valutaFunzione(intervallo.max);

        if (n1 && n2 && n1 * n2 < 0) {
            setListaOperazioni([]);

            let ultimoMax = intervallo.max;
            for (let i = 0; i < iterazioni; i++) {
                let puntoMedio = parseFloat(((intervallo.min + ultimoMax) / 2).toFixed(precisione));
                setListaOperazioni(prev => [...prev, puntoMedio]);
    
                // Controllo se già siamo a 0
                if (valutaFunzione(puntoMedio) == 0) {
                    setRisultato(puntoMedio);
                    return;
                }
                // Assegna il nuovo ultimoMax o min
                n1 = valutaFunzione(puntoMedio);
                n2 = valutaFunzione(intervallo.min);
                if (n1 && n2 && n1 * n2 < 0) {
                    ultimoMax = puntoMedio;
                } else {
                    intervallo.min = puntoMedio; 
                }
            }
            setRisultato(ultimoMax);
        } else {
            if(n1 == null || n2 == null){
                setTitoloPopUp("ERRORE!");
                setTestoPopUp("Espressione non valida!");
                popUp.current?.showModal();
            } else {
                setTitoloPopUp("ERRORE!");
                setTestoPopUp("I numeri che hai impostato non assumono valori di segno opposto!");
                popUp.current?.showModal();
            }
        }
    }

    return (
        <>
            {/* Codice */}
            <div className="absolute top-0 left-0 w-full min-h-full h-full bg-red-400 flex items-center justify-center flex-col">

                <dialog ref={popUp} className="modal">
                    <div className="bg-white modal-box">
                        <h3 className="font-bold text-lg">{titoloPopUp}</h3>
                        <p className="py-4">{testoPopUp}</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>

                <div className="w-fit flex gap-2">
                    {/* Assegna min e max */}
                    <div className="flex flex-col">
                        <p className="text-white">MIN</p>
                        <input className="text-black bg-white" type="number" onChange={(e) => {setIntervallo(prev => ({...prev, min: Number(e.target.value)}))}}/>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-white">MAX</p>
                        <input className="text-black bg-white" type="number" onChange={(e) => {setIntervallo(prev => ({...prev, max: Number(e.target.value)}))}}/>
                    </div>
                </div>
                <p className="mt-2 text-white">ITERAZIONI</p>
                <input className="text-black bg-white" type="number" onChange={(e) => {setIterazioni(Number(e.target.value))}} defaultValue={iterazioni}/>
                <p className="mt-2 text-white">PRECISIONE (NUMERO CIFRE DOPO LA VIRGOLA)</p>
                <input className="text-black bg-white" type="number" onChange={(e) => {setPrecisione(Number(e.target.value))}} defaultValue={precisione}/>
                <p className="mt-2 text-white">ESPRESSIONE</p>
                <input className="mt-1 text-black bg-white" type="text" onChange={(e)=>{setEspressione(e.target.value);}}/>
                <button className="bg-green-400 rounded-lg p-2 mt-2 text-white" onClick={elaboraFunzione}>VALUTA</button>

                <p className="text-white text-center">RISULTATO APPROSSIMATO:<br/> {risultato}</p>
                <div className="relative">
                    <p className="text-white">LISTA OPERAZIONI:</p>
                    <div className="h-40 flex items-center flex-col overflow-y-auto text-green-200">
                        {listaOperazione.map((e) => {
                            return <p className="text-yellow-300">{e}</p>
                        })}
                    </div>
                </div>
            </div>

        </>
    )

}


// Hook to use the context
export default MainPage
