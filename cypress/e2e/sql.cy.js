describe('connect to Db', () => {
    it ('can connect to db', () => {
        cy.task ('queryDb', `CREATE TABLE Students (StudentID int, FirstName varchar(255), 
        StudentGroup varchar(255), City varchar(255))`)
    })

    it('Input entries', () => {
        cy.task ('queryDb',
        `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
        (1, "Ivan", "02-2022", "Barcelona"),
        (2, "Maria", "03-2022", "Lala"),
        (3, "Andrey", "02-2023", "Barca")`)
        .then((result) => {
            cy.log(JSON.stringify(result))
            expect(result.affectedRows).to.equal(3)
        })
    });

    it('select', () => {
        cy.task ('queryDb',
        `SELECT FirstName FROM Students WHERE City = "Barcelona"`)
        .then((result) => {
            cy.log(JSON.stringify(result))
            expect(result[0].FirstName).to.equal("Ivan")
        })
    });

    it('can delete the db', () => {
        cy.task ('queryDb', 
        "DROP TABLE Students")
    })
})