# Minor Project: Atheneum - Interactive Library Management System

### Prerequisites:  
* Python  
* NPM  
### Steps to setup: 
1. Clone this repository from your method of choice  
2. Install pipenv   
``` pip install pipenv ```
4. Make sure your python version is 3.7
5. If python version is not 3.7 then try installing it or (not recommended) change the python version in pipfile to your installed python version.  
6. Navigate to root directory of the project, you prompt should show something like "~/project/folder/ATHENEUM-Interactive-Library-Management-System" for Linux or "C:\project\folder\ATHENEUM-Interactive-Library-Management-System" for windows
7. Install python dependencies by initiating virtual environment via
``` pipenv shell ```
8. Download the [SVD.joblib](https://drive.google.com/file/d/1E6K3qgEryn6pADBxfbtFjUNCOMbIrUTk/view?usp=sharing) file and place it in ```~/project/folder/ATHENEUM-Interactive-Library-Management-System/Atheneum/prediction/mlmodel/```
9.  Download and save book_summaries1.csv in ```~/project/folder/ATHENEUM-Interactive-Library-Management-System/Atheneum/prediction/Data/```
10. Open another terminal and navigate to ```~/project/folder/ATHENEUM-Interactive-Library-Management-System/Atheneum/frontend/``` and install npm dependencies via ```npm install```
11. Build frontend by running ```npm run build```
12. Navigate  ```~/project/folder/ATHENEUM-Interactive-Library-Management-System/Atheneum/``` then run django server via ```python manage.py runserver```.
