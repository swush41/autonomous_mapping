Autonomous_Mapping 

- I have built a program to identify collected data and match them with a specific built-in number to be able to recognize them in our backend.
- The function itself splits the string data into parts and look for matches: e.g.
if the scraper definition of a model is = **Volvo V90 B4 Inscription Geartronic** 
then the return of the function will be: (with an id suggested that matches with our car data)


```
[ 'volvo', 'v90', 'b4', 'd', 'geartronic', 'inscription' ] ---> the splitted version of a scraped data to match the given one above

[
  { name: 'volvo', matched: true },
  { name: 'v90', matched: true },
  { name: 'b4', matched: true },
  { name: 'inscription', matched: true },
  { name: 'geartronic', matched: true },
  { true: 5 },
  { car_id: '25446' }
]
```
