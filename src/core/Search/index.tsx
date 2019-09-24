import styled from "@emotion/styled";
import * as libphonenumber from "google-libphonenumber";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import * as R from "ramda";
import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { AutoSizer, Column, Table } from "react-virtualized";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import injectReducer from "@b6y/ui/redux/injectReducer";
import injectSaga from "@b6y/ui/redux/injectSaga";
import { Adapter } from "@b6y/ui/search";

import { ButtonTransparent, Group, Icon } from "../../core";
import LoadingIndicator from "../../core/LoadingIndicator";
import { getBgColor } from "../../styled/system";
import { Box } from "../../styled";
import Tooltip from "../Tooltip";
import actionsBuilder from "./actionsBuilder";
import constantsBuilder from "./constantsBuilder";
import styles from "./index.css";
import messages from "./messages";
import reducerBuilder from "./reducerBuilder";
import sagaBuilder from "./sagaBuilder";
import {
  BaseCellElementProps,
  BuiltSearchMeta,
  OuterProps,
  Props,
  State,
  TypesMap,
} from "./types";

const PNF = libphonenumber.PhoneNumberFormat;
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const BaseRow = styled.div`
  &:focus {
    box-shadow: inset 4px 0 0 0 ${getBgColor("primary")};
    outline: 0;
  }
`;

const BaseCellElementWrapper = styled.div`
  padding: 4px;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  overflow: hidden;
`;

class BaseCellElement extends React.PureComponent<BaseCellElementProps> {
  public render() {
    const { value } = this.props;

    return (
      <BaseCellElementWrapper>{value}</BaseCellElementWrapper>
    );
  }
}

const DateField = ({ value }) => <BaseCellElement value={value} />;
DateField.propTypes = {
  value: PropTypes.any,
};

const DatetimeField = ({ value }) => {
  let formatted = null;

  if (value) {
    formatted = DateTime.fromISO(value, { zone: "UTC" })
      .setZone("local")
      .toLocaleString(DateTime.DATETIME_SHORT);
  }

  return <BaseCellElement value={formatted} />;
};
DatetimeField.propTypes = {
  value: PropTypes.any,
};

const NumberField = ({ value }) => <BaseCellElement value={value} />;
NumberField.propTypes = {
  value: PropTypes.any,
};

const phoneCache = {};

const PhoneField = ({ value }) => {
  let formatted = null;
  if (value && phoneCache.hasOwnProperty(value)) {
    formatted = phoneCache[value];
  } else if (value) {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(value);
    formatted = phoneUtil.format(parsedNumber, PNF.INTERNATIONAL);
    phoneCache[value] = formatted;
  }

  return <BaseCellElement value={formatted} />;
};
PhoneField.propTypes = {
  value: PropTypes.any,
};

const Types = {
  date: DateField,
  datetime: DatetimeField,
  number: NumberField,
  phone: PhoneField,
};

class Search<AdapterContext> extends React.PureComponent<Props<AdapterContext>, State> {
  public static defaultProps = {
    name: "default",
    defaultSearch: {},
    controlsWidth: 150,
    limit: 10,
    env: {},
    searchStore: null,
    $options: {},
  };

  public $types?: TypesMap = null;

  constructor(props) {
    super(props);

    this.headerRenderer = this.headerRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.rowClassName = this.rowClassName.bind(this);
    this.rowGetter = this.rowGetter.bind(this);
    this.cellRenderer = this.cellRenderer.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.navigate = this.navigate.bind(this);
    this.goTo = this.goTo.bind(this);
    this.registerAndNavigate = this.registerAndNavigate.bind(this);
  }

  public componentDidMount() {
    this.registerAndNavigate();
  }

  public types() {
    if (process.env.NODE_ENV === "production" && this.$types) {
      return this.$types;
    }

    const actualTypes = { ...Types };

    this.$types = actualTypes;

    return actualTypes;
  }

  public registerAndNavigate() {
    const {
      name,
      defaultSearch,
      env,
      field,
      fields,
      limit,
    } = this.props;

    this.props.registerAndSearch(
      {
        name,
        defaultSearch,
        env,
        field,
        fields,
        limit,
      },
      {},
      {},
    );
  }

  public goTo(page) {
    return () => {
      this.navigate(page, true);
    };
  }

  public navigate(page = null, scrolling = false) {
    const { search, name } = this.props;

    search(name, null, { page, scrolling });
  }

  public noRowsRenderer() {
    return <div className={styles.noRows}>Nenhum item encontrado...</div>;
  }

  public helpRenderer(env, f) {
    if (!f.help) {
      return null;
    }

    let title = null;

    if (f.help instanceof String) {
      title = <b>f.help</b>;
    } else {
      title = <FormattedMessage {...f.help} />;
    }

    return (
      <Tooltip position="bottom" text={title}>
        <Icon name="info-circle" style={{ marginLeft: 5 }} />
      </Tooltip>
    );
  }

  public headerTitleRenderer(env, f) {
    if (!f.name) {
      return null;
    }

    if (f.name instanceof String) {
      return <b>{f.name}</b>;
    }

    return <FormattedMessage {...f.name} />;
  }

  public headerRenderer(env, f) {
    return () => {
      return (
        <div>
          {this.headerTitleRenderer(env, f)}
          {this.helpRenderer(env, f)}
        </div>
      );
    };
  }

  public rowClassName({ index }) {
    if (index < 0) {
      return styles.headerRow;
    }

    return [index % 2 === 0 ? styles.evenRow : styles.oddRow, styles.row];
  }

  public rowGetter({ index }) {
    const {
      searchStore: { current },
    } = this.props;

    return current.items[index];
  }

  public cellRenderer(env, field) {
    let Element: React.ComponentType<any> = BaseCellElement;

    const types = this.types();

    if (field.type) {
      if (types[field.type]) {
        Element = types[field.type];
      } else {
        Element = field.type;
      }
    }

    return ({ rowData }) => {
      let value = null;

      if (field.renderValue) {
        value = field.renderValue(rowData);
      } else {
        value = R.pathOr(null, (field.path || field.id).split("."), rowData);
      }

      return <Element env={env} value={value} row={rowData} field={field} />;
    };
  }

  public rowRenderer(fields) {
    return ({
      className,
      columns,
      index,
      key,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOut,
      onRowMouseOver,
      onRowRightClick,
      rowData,
      style,
    }) => {
      const a11yProps: any = {};

      if (
        onRowClick ||
        onRowDoubleClick ||
        onRowMouseOut ||
        onRowMouseOver ||
        onRowRightClick
      ) {
        a11yProps["aria-label"] = "row";
        a11yProps.tabIndex = 0;

        if (onRowClick) {
          a11yProps.onClick = (event) => onRowClick({ event, index, rowData });
        }
        if (onRowDoubleClick) {
          a11yProps.onDoubleClick = (event) =>
            onRowDoubleClick({ event, index, rowData });
        }
        if (onRowMouseOut) {
          a11yProps.onMouseOut = (event) =>
            onRowMouseOut({ event, index, rowData });
        }
        if (onRowMouseOver) {
          a11yProps.onMouseOver = (event) =>
            onRowMouseOver({ event, index, rowData });
        }
        if (onRowRightClick) {
          a11yProps.onContextMenu = (event) =>
            onRowRightClick({ event, index, rowData });
        }
      }

      return (
        <BaseRow
          {...a11yProps}
          className={className}
          key={key}
          role="row"
          style={style}
          tabIndex={0}
        >
          {columns}
        </BaseRow>
      );
    };
  }

  public render() {
    const { controlsWidth, controls, searchStore } = this.props;

    if (!searchStore || searchStore.isLoading) {
      return (
        <div>
          <LoadingIndicator />
        </div>
      );
    }

    const { current, fields, env } = searchStore;

    const pagesRange = R.range(1, current.totalOfPages + 1).filter((item) => {
      if (
        (item <= 3 && current.currentPage < 3) ||
        (item <= current.currentPage + 1 && item >= current.currentPage - 1)
      ) {
        return true;
      }

      return item > current.totalOfPages - 3;
    });

    if (current.total < 1) {
      return (
        <div style={{ padding: 30, textAlign: "center" }}>
          Nenhum item encontrado
        </div>
      );
    }

    const isSequential = pagesRange.reduce((accumulator, item: any, index, all) => {
      const prev: any = all[index - 1];

      return accumulator && (prev ? prev.number + 1 === item.number : true);
    }, true);

    let pages = pagesRange;

    if (pages.length === 6 && !isSequential) {
      pages = [...pages.slice(0, 3), -1, ...pages.slice(3, 6)];
    }

    const pagesButtons = pages.map((x) => {
      if (x === -1) {
        return (
          <ButtonTransparent key="null-page" disabled>
            ...
          </ButtonTransparent>
        );
      }

      return (
        <ButtonTransparent
          key={`page-${x}`}
          onClick={this.goTo(x)}
          state={x === current.currentPage ? "primary" : "default"}
        >
          {x}
        </ButtonTransparent>
      );
    });

    const pagesComponents = [
      <ButtonTransparent key="first-page" onClick={this.goTo(1)}>
        <Icon name="angle-double-left" />
      </ButtonTransparent>,
      ...pagesButtons,
      <ButtonTransparent
        key="last-page"
        onClick={this.goTo(current.totalOfPages)}
      >
        <Icon name="angle-double-right" />
      </ButtonTransparent>,
    ];

    let footer = (_) => null;

    if (pagesComponents.length > 3) {
      footer = (width) => (
        <Group justifyContent="center" style={{ width }} mt={4}>
          {pagesComponents}
        </Group>
      );
    }

    return (
      <div style={{ height: "100%" }}>
        <Box m={2} fontSize={1}>Aproximadamente <b>{current.total}</b> resultados foram encontrados</Box>
        <AutoSizer disableHeight>
          {({ width }) => (
            <Box fontSize={1}>
              <Table
                headerHeight={40}
                height={Math.min(500, current.totalOnPage * 40) + 55}
                noRowsRenderer={this.noRowsRenderer}
                rowClassName={this.rowClassName}
                headerClassName={styles.headerColumn}
                rowHeight={40}
                rowGetter={this.rowGetter}
                width={width}
                rowCount={current.totalOnPage}
                rowRenderer={this.rowRenderer(fields)}
              >
                {fields.map((f) => (
                  <Column
                    dataKey={f.id}
                    key={f.id}
                    width={f.width}
                    headerRenderer={this.headerRenderer(env, f)}
                    className={styles.rowColumn}
                    cellRenderer={this.cellRenderer(env, f)}
                    flexGrow={1}
                  />
                ))}
                <Column
                  dataKey="controls"
                  width={controlsWidth}
                  headerRenderer={this.headerRenderer(env, messages.controls)}
                  className={styles.rowColumn}
                  cellDataGetter={({ rowData }) => rowData}
                  cellRenderer={(p) => controls(env, p)}
                />
              </Table>
              <div style={{ clear: "both" }} />
              {footer(width)}
            </Box>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export class BuiltSearch<AdapterContext> {

  get Component(): new(...args) => React.Component<OuterProps<AdapterContext>, State> {
    return this.component;
  }

  public adapter: Adapter<AdapterContext>;
  public component: typeof Search;
  public meta: BuiltSearchMeta;
  public constants: any;
  public actions: any;
  public options: any;

  constructor(
    component: React.ComponentClass<OuterProps<AdapterContext>, State>,
    adapter: Adapter<AdapterContext>,
    meta: BuiltSearchMeta,
    options: any,
  ) {
    this.adapter = adapter;
    this.meta = meta;
    this.options = options;

    this.constants = constantsBuilder(this);
    this.actions = actionsBuilder(this);

    this.build(component);
  }

  public selector(name: string = "default") {
    return (state: any) => {
      return (state[this.meta.id] || {})[name] || null;
    };
  }

  public propsSelector() {
    return (state: any, props: any) => {
      return this.selector(props.name)(state);
    };
  }

  private build(component: React.ComponentClass<OuterProps<AdapterContext>, State>) {
    const { actions, meta } = this;
    const { id } = meta;

    const mapDispatchToProps = (dispatch, props) => {
      return {
        setLoading: (name, state) =>
          dispatch(actions.setLoading(name, state)),
        setCurrent: (name, current) =>
          dispatch(actions.setCurrent(name, current)),
        register: (data) => dispatch(actions.register(data)),
        registerAndSearch: (componentToRegister, search, params) => {
          return dispatch(
            actions.registerAndSearch(componentToRegister, props.adapterContext, search, params),
          );
        },
        search: (name, search, params) => {
          dispatch(actions.search(name, props.adapterContext, search, params))
        },
      };
    };

    const mapStateToProps = createStructuredSelector({
      searchStore: this.propsSelector(),
      reducerName: () => id,
    });

    const withConnect = connect(
      mapStateToProps,
      mapDispatchToProps,
    );

    const withReducer = injectReducer({
      key: id,
      reducer: reducerBuilder(this),
    });

    const withSaga = injectSaga({
      key: id,
      saga: sagaBuilder(this),
    });

    const newComponent = compose<typeof Search>(
      withReducer,
      withSaga,
      withConnect,
    )(component);

    newComponent.defaultProps = Search.defaultProps;

    this.component = newComponent;
  }
}

const searchCache = {};

export default function buildSearch<AdapterContext>(
  rootName: string,
  adapter: Adapter<AdapterContext>,
  options = {},
): BuiltSearch<AdapterContext> {
  if (
    process.env.NODE_ENV === "production" &&
    searchCache.hasOwnProperty(rootName)
  ) {
    return searchCache[rootName];
  }

  const reducerName = `@b6y/ui/core/Search:${rootName}`;

  const builtSearch = new BuiltSearch<AdapterContext>(
    Search,
    adapter,
    { id: reducerName, name: rootName },
    options,
  );

  searchCache[rootName] = builtSearch;

  return builtSearch;
}
