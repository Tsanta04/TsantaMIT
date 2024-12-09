/****************************************************************************
** Meta object code from reading C++ file 'mainwindow.h'
**
** Created by: The Qt Meta Object Compiler version 68 (Qt 6.6.1)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../dhcp/mainwindow.h"
#include <QtCore/qmetatype.h>

#if __has_include(<QtCore/qtmochelpers.h>)
#include <QtCore/qtmochelpers.h>
#else
QT_BEGIN_MOC_NAMESPACE
#endif


#include <memory>

#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'mainwindow.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 68
#error "This file was generated using the moc from 6.6.1. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

#ifndef Q_CONSTINIT
#define Q_CONSTINIT
#endif

QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
QT_WARNING_DISABLE_GCC("-Wuseless-cast")
namespace {

#ifdef QT_MOC_HAS_STRINGDATA
struct qt_meta_stringdata_CLASSMainWindowENDCLASS_t {};
static constexpr auto qt_meta_stringdata_CLASSMainWindowENDCLASS = QtMocHelpers::stringData(
    "MainWindow",
    "on_menu_triggered",
    "",
    "on_rechercher_clicked",
    "listeL2",
    "listeL1",
    "getIp",
    "string",
    "p",
    "on_add_clicked",
    "ajouterL1",
    "ajouterL2",
    "on_liste_cellDoubleClicked",
    "row",
    "column",
    "on_input_textChanged"
);
#else  // !QT_MOC_HAS_STRING_DATA
struct qt_meta_stringdata_CLASSMainWindowENDCLASS_t {
    uint offsetsAndSizes[32];
    char stringdata0[11];
    char stringdata1[18];
    char stringdata2[1];
    char stringdata3[22];
    char stringdata4[8];
    char stringdata5[8];
    char stringdata6[6];
    char stringdata7[7];
    char stringdata8[2];
    char stringdata9[15];
    char stringdata10[10];
    char stringdata11[10];
    char stringdata12[27];
    char stringdata13[4];
    char stringdata14[7];
    char stringdata15[21];
};
#define QT_MOC_LITERAL(ofs, len) \
    uint(sizeof(qt_meta_stringdata_CLASSMainWindowENDCLASS_t::offsetsAndSizes) + ofs), len 
Q_CONSTINIT static const qt_meta_stringdata_CLASSMainWindowENDCLASS_t qt_meta_stringdata_CLASSMainWindowENDCLASS = {
    {
        QT_MOC_LITERAL(0, 10),  // "MainWindow"
        QT_MOC_LITERAL(11, 17),  // "on_menu_triggered"
        QT_MOC_LITERAL(29, 0),  // ""
        QT_MOC_LITERAL(30, 21),  // "on_rechercher_clicked"
        QT_MOC_LITERAL(52, 7),  // "listeL2"
        QT_MOC_LITERAL(60, 7),  // "listeL1"
        QT_MOC_LITERAL(68, 5),  // "getIp"
        QT_MOC_LITERAL(74, 6),  // "string"
        QT_MOC_LITERAL(81, 1),  // "p"
        QT_MOC_LITERAL(83, 14),  // "on_add_clicked"
        QT_MOC_LITERAL(98, 9),  // "ajouterL1"
        QT_MOC_LITERAL(108, 9),  // "ajouterL2"
        QT_MOC_LITERAL(118, 26),  // "on_liste_cellDoubleClicked"
        QT_MOC_LITERAL(145, 3),  // "row"
        QT_MOC_LITERAL(149, 6),  // "column"
        QT_MOC_LITERAL(156, 20)   // "on_input_textChanged"
    },
    "MainWindow",
    "on_menu_triggered",
    "",
    "on_rechercher_clicked",
    "listeL2",
    "listeL1",
    "getIp",
    "string",
    "p",
    "on_add_clicked",
    "ajouterL1",
    "ajouterL2",
    "on_liste_cellDoubleClicked",
    "row",
    "column",
    "on_input_textChanged"
};
#undef QT_MOC_LITERAL
#endif // !QT_MOC_HAS_STRING_DATA
} // unnamed namespace

Q_CONSTINIT static const uint qt_meta_data_CLASSMainWindowENDCLASS[] = {

 // content:
      12,       // revision
       0,       // classname
       0,    0, // classinfo
      10,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       0,       // signalCount

 // slots: name, argc, parameters, tag, flags, initial metatype offsets
       1,    0,   74,    2, 0x08,    1 /* Private */,
       3,    0,   75,    2, 0x08,    2 /* Private */,
       4,    0,   76,    2, 0x08,    3 /* Private */,
       5,    0,   77,    2, 0x08,    4 /* Private */,
       6,    1,   78,    2, 0x08,    5 /* Private */,
       9,    0,   81,    2, 0x08,    7 /* Private */,
      10,    0,   82,    2, 0x08,    8 /* Private */,
      11,    0,   83,    2, 0x08,    9 /* Private */,
      12,    2,   84,    2, 0x08,   10 /* Private */,
      15,    0,   89,    2, 0x08,   13 /* Private */,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    0x80000000 | 7, 0x80000000 | 7,    8,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, QMetaType::Int, QMetaType::Int,   13,   14,
    QMetaType::Void,

       0        // eod
};

Q_CONSTINIT const QMetaObject MainWindow::staticMetaObject = { {
    QMetaObject::SuperData::link<QMainWindow::staticMetaObject>(),
    qt_meta_stringdata_CLASSMainWindowENDCLASS.offsetsAndSizes,
    qt_meta_data_CLASSMainWindowENDCLASS,
    qt_static_metacall,
    nullptr,
    qt_incomplete_metaTypeArray<qt_meta_stringdata_CLASSMainWindowENDCLASS_t,
        // Q_OBJECT / Q_GADGET
        QtPrivate::TypeAndForceComplete<MainWindow, std::true_type>,
        // method 'on_menu_triggered'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'on_rechercher_clicked'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'listeL2'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'listeL1'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'getIp'
        QtPrivate::TypeAndForceComplete<string, std::false_type>,
        QtPrivate::TypeAndForceComplete<string, std::false_type>,
        // method 'on_add_clicked'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'ajouterL1'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'ajouterL2'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        // method 'on_liste_cellDoubleClicked'
        QtPrivate::TypeAndForceComplete<void, std::false_type>,
        QtPrivate::TypeAndForceComplete<int, std::false_type>,
        QtPrivate::TypeAndForceComplete<int, std::false_type>,
        // method 'on_input_textChanged'
        QtPrivate::TypeAndForceComplete<void, std::false_type>
    >,
    nullptr
} };

void MainWindow::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<MainWindow *>(_o);
        (void)_t;
        switch (_id) {
        case 0: _t->on_menu_triggered(); break;
        case 1: _t->on_rechercher_clicked(); break;
        case 2: _t->listeL2(); break;
        case 3: _t->listeL1(); break;
        case 4: { string _r = _t->getIp((*reinterpret_cast< std::add_pointer_t<string>>(_a[1])));
            if (_a[0]) *reinterpret_cast< string*>(_a[0]) = std::move(_r); }  break;
        case 5: _t->on_add_clicked(); break;
        case 6: _t->ajouterL1(); break;
        case 7: _t->ajouterL2(); break;
        case 8: _t->on_liste_cellDoubleClicked((*reinterpret_cast< std::add_pointer_t<int>>(_a[1])),(*reinterpret_cast< std::add_pointer_t<int>>(_a[2]))); break;
        default: ;
        }
    }
}

const QMetaObject *MainWindow::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *MainWindow::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_CLASSMainWindowENDCLASS.stringdata0))
        return static_cast<void*>(this);
    return QMainWindow::qt_metacast(_clname);
}

int MainWindow::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QMainWindow::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 10)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 10;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 10)
            *reinterpret_cast<QMetaType *>(_a[0]) = QMetaType();
        _id -= 10;
    }
    return _id;
}
QT_WARNING_POP
