import datetime as dt

class Student:
    def __init__(self, firstName, lastName, birth_year):
        self.name = firstName + " " + lastName
        self.birth_year = birth_year
    def getAge(self):
        return dt.datetime.now().year - self.birth_year


s = Student("Isaac","Carr",1996)
s.birth_year = "big mumma" 
print(s.getAge())
