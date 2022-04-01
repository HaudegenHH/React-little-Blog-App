import { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    /* 
    https://javascript.info/fetch-abort
    The AbortController is a simple object that generates an abort event on it’s signal property when the abort() method is called (and also sets signal.aborted to true).
    fetch integrates with it: pass the signal property as the option, and then fetch listens to it, so it’s possible to abort the fetch.
    */
    const abortController = new AbortController();
    fetch(url, { signal: abortController.signal })
      .then(res => {
        if(!res.ok){
          throw new Error('Failed to fetch ressource!')
        }
        return res.json() 
      })
      .then(data => {
        //console.log(data)
        setError(null)
        setData(data)
        setIsPending(false)
      })
      .catch(err => {
        if(err.name === 'AbortError'){
          console.log("Fetch request aborted");          
        } else {
          setError("An Error occurred: " + err.message)
          setIsPending(false)
        }
      })

      // essentially aborts the fetch process / so called "Clean-Up Function"
      return () => abortController.abort() 

  }, [url]) // whenever the url (the dependency) changes it causes useEffect to rerun

  return { data, isPending, error }
}

export default useFetch